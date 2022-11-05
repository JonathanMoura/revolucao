sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }
                    ]
                };
                
                var ImageModel = new JSONModel(ImageList);
                this.getView().setModel(ImageModel, "ModeloImagem");
            },

            onPressBuscar: function () {
                //alert("Começou a revolução Fiori");
                var oInputBusca = this.byId("InpBusca");
                var sQuery = oInputBusca.getValue();
                //alert(sQuery);
                $.ajax({
                    //Cabeçalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async:true,
                    crossDomain:true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                        "X-RapidAPI-Key": "b0a4b91909msh84a5065c38258b1p186783jsnf26f529efd97",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com" 
                    },
                    //Corpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "sageSearch": true
                    },
                    //Retorno em caso de erro
                    success: function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        oDadosImage = {
                            Images: []
                        };
                        
                        oImageModel.setData(oDadosImage);
                        debugger

                        var listaResultados = data.value;
                        var newItem;

                        for(var i = 0; i < listaResultados.length; i++){
                            newItem = listaResultados[i];
                            oDadosImage.Images.push(newItem);
                        };

                        oImageModel.refresh();

                    }.bind(this),
                    //Retorno em caso de sucesso
                    error: function(){

                    }.bind(this)
                });//Fim do $.ajax
            }
        });
    });
