// 'use strict';
// angular.module('main')
// .service('ModelConverter', function (lodash,$filter,Parse) {


//   var converterToForm = function(type,value){
//     if (type == Date){
//       if (angular.isDate(value)){
//         return $filter('date')(value,'yyyy-MM-dd')
//       }
//     }

//     else if (type == Array){
//       if (!angular.isArray(value)){
//         return []
//       }
//       else
//        return value

//     }
//     else if (type == Object){
//       return angular.isObject(value) ? value : {}
//     }
//     else if (angular.isFunction(type) && !!type.__super__){
//       if (!value){
//         return {}
//       }
//       if (value.id){
//         return value
//       }
//     }
//     else if (type == Parse.File){
//       return value
//     }
//     else {
//       return value
//     }
//   }

//   var convertFromForm = function(def,value){
//     var type = def.type
//     var subType = def.subType

//     if (type == Date){
//       if (angular.isString(value)){
//         return new Date(value)
//       }
//       return value
//     }
//     else if (type == Array && subType == Parse.File ){
//       return value
//     }
//     else if (type == Array){
//       //strip hash keys
//       return JSON.parse(angular.toJson(value))
//     }
//     else if (type == Object){
//       return angular.copy(value)
//     }
//     else if (angular.isFunction(type) && !!type.__super__){
//       if (value instanceof Parse.Object){
//         return value
//       }
//       if (angular.isString(value)){
//         return new type( { id : value})
//       }

//       if (angular.isObject(value) && value.id  ){
//         return new type( { id : value.id } )
//       }
//     }
//     else if (type == Parse.File){
//       return value
//     }
//     else {
//       return value
//     }
//   }


//   var toForm = function(definition,object){
//     var form = {}
//     lodash.each(definition, function (def,key){
//       var value = object[key]
//       var type = def.type
//       form[key] = converterToForm(type,value)

//     })
//     return angular.copy(form)
//   }

//   var fromForm = function(definition,form,object){
//     lodash.each(definition,function (def,key) {
//       object[key] = convertFromForm(def,form[key])
//     })
//   }

//   var getDefs = function(definitions){
//     return lodash.keys(definitions)
//   }

//   var getFileKeys = function(definition){
//     return lodash(definition).pickBy(function(def,key){
//       return def.type == Parse.File || def.subType == Parse.File
//     }).keys().value()

//   }

//   var isFileFormObject = function(object){
//     return object instanceof File
//   }

//   var getRequiredFields = function(defs){
//     var keys = []
//     lodash.each(defs,function(def,key){
//       if (def.required) keys.push(key)
//     })
//     return keys
//   }

//   var getSchema = function(defs){
//     var schema = {
//       type :'object',
//       properties : {},
//       required : getRequiredFields(defs)
//     }
//     lodash.each(defs,function(def,schmemaKeyName){
//       if (def.schema) schema.properties[schmemaKeyName] = def.schema
//     })
//     return schema
//   }

//   var getForm = function(defs){
//     let schema = getSchema(defs)
//     return  Object.keys(schema.properties).map(key => new Object({key: key}))
//   }

//   var getReadOnlySchema = (definition)=>{
//     const schema = angular.copy(getSchema(definition))
//     lodash.forOwn(schema.properties,(value,key)=> value.readonly = true  )
//     return schema
//   }


//   var patchObject = function(className ,definition){
//     var ParseObject = Parse.Object.extend(className)
//     Parse.defineAttributes(ParseObject,getDefs(definition))

//     ParseObject.getSchema = function(){
//       return getSchema(definition)
//     }

//     ParseObject.excludeKeys = function (notToExclude = [],prefix = "") {
//       let exclusionKeys = lodash.difference(Object.keys(definition),notToExclude)
//       return exclusionKeys.map( key => prefix+key  )
//     }

//     ParseObject.selectKeys = function(keys = [], prefix = ""){
//         return keys.map( key => prefix+key)
//     }

//     ParseObject.getDefs = function(){
//       return getDefs(definition)
//     }


//     ParseObject.getForm = function(){
//       return getForm(definition)
//     }
//     ParseObject.getReadOnlySchema = function () {
//       return getReadOnlySchema(definition)
//     }

//     ParseObject.getRequiredFields = function () {
//       return getRequiredFields(definition)
//     }

//     ParseObject.query = function () {
//       return new Parse.Query(ParseObject)
//     }

//     ParseObject.prototype.createFormModel = function(){
//       this.formContent = toForm(definition,this)
//       return this
//     }

//     ParseObject.prototype.conversion = function(){
//       fromForm(definition,this.formContent,this)
//     }

//     ParseObject.prototype.validateSelf = function(){
//       var self = this
//       var unfilledFields = []
//       var requiredFields = getRequiredFields(definition)
//       lodash.each(requiredFields,function (key) {
//         if (self[key] == null ) unfilledFields.push(key)
//       })

//       let validateSelf = angular.isFunction(self._validateSelf) ? self._validateSelf() : true

//       return !unfilledFields.length && validateSelf
//     }

//       /**
//        * Will return the form name, if part has a title Map"
//        * @param key {string}
//        * @returns {*}
//        */

//     ParseObject.prototype.getNameForValue = function(key){
//       var titleMap = lodash.get(definition[key],"schema['x-schema-form'].titleMap")
//       var value = this[key]
//       if (!titleMap){
//         return value
//       }
//       else{
//         var title = lodash.find(titleMap,["value",value])
//         if (title){
//           return title.name
//         }
//         else
//           return value
//       }
//     }


//     ParseObject.prototype.saveWithFiles = function(){
//       var fileKeys = getFileKeys(definition)
//       if (!fileKeys[0]){
//         return this.save()
//       }
//       else{
//         var self = this
//         var toSave = []
//         lodash.each(fileKeys,function(keyName){
//           var fileContainer = self[keyName]
//           if (!angular.isArray(fileContainer)){
//             if (isFileFormObject(fileContainer)){
//               self[keyName]= new Parse.File(fileContainer.name,fileContainer)
//               toSave.push(self[keyName])
//             }
//           }

//           else if (angular.isArray(fileContainer)) {
//               self[keyName] = lodash.map(fileContainer,function(file){
//                 if (isFileFormObject(file)){
//                   var parseFile = new Parse.File(file.name,file)
//                   toSave.push(parseFile)
//                   return parseFile
//                 }
//                 else {
//                   return file
//                 }
//               })
//             }

//         })

//         if (!toSave[0]){
//           return self.save()
//         }
//         else {
//           return Parse.Object.saveAll(toSave).then(
//             function(){
//               return self.save()
//             }
//           )
//         }

//       }
//     }

//     ParseObject.prototype.conversionSave = function(){
//       this.conversion()
//       return this.save()
//     }

//     return ParseObject

//   }


//   var saveAll = function(array){
//     var convertedObjects = lodash.map(array,function(obj){
//       obj.conversion()
//       return obj
//     })
//     return Parse.Object.saveAll(convertedObjects)
//   }


//   return {
//     toForm : toForm,
//     fromForm : fromForm,
//     getDefs : getDefs,
//     patchObject : patchObject,
//     saveAll : saveAll
//   }
  
// });
