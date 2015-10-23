/**
 * Created by tpf on 20.10.15.
 */
'use strict';

angular.module('companyService', [])

.factory('CompanyDetails', ['$log',function(){
    var company;



    return{
        setCompany: function(jsonObject){
            company = jsonObject;
        },
        getCompany: function(){
            return company;
        }
    };
}]);
