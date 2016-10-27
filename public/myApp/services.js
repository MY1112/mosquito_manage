app.factory('login_manager', function ($rootScope) {
    var call = function (phone, code, cb) {
        cb = cb || function () {
            }
        AV.User.logInWithMobilePhoneSmsCode(phone, code).then(function (data) {
            $rootScope.$apply(cb(data))
        }, function (error) {
            console.log('err:' + error)
        });
    }
    return {call: call};
}).factory('LeanCloudClassService', function ($http) {
    function handelWhere(data) {
        var where_sql = '?';
        var item;
        for (var key in data) {
            if (where_sql != '?') {
                where_sql += "&"
            }
            if (typeof data[key] == 'object' && data[key]) {
                item = encodeURIComponent(JSON.stringify(data[key]))
            } else {
                item = encodeURIComponent(data[key])
            }
            where_sql += key + '=' + item
        }
        return where_sql
    }

    return {
        query: function (className, limit, cb) {
            cb = cb || function () {
                };
            $http.get("https://api.leancloud.cn/1.1/classes/" + className + handelWhere(limit), {
                headers: {
                    "X-LC-Id": "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz",
                    "X-LC-Key": "Ronj9oBORrmjCDx2HdlhCwr3",
                    "Content-Type": "application/json"
                }
            })
                .success(function (data) {
                    cb(data.results)
                });
        },
        test_query: function (className, limit, cb) {
            cb = cb || function () {
                };
            $http.get("https://api.leancloud.cn/1.1/classes/" + className + handelWhere(limit), {
                headers: {
                    "X-LC-Id": "FDCqzaM1bcHHJ80LU36VEIv1-gzGzoHsz",
                    "X-LC-Key": "Ronj9oBORrmjCDx2HdlhCwr3",
                    "Content-Type": "application/json"
                }
            })
                .success(function (data) {
                    cb(data.results)
                });
        }
    }
}).factory('add_article', function ($rootScope) {
    var add = function (title, type, content, cb) {
        cb = cb || function () {
            }
        var TodoFolder = AV.Object.extend('Article');
        var todoFolder = new TodoFolder();
        todoFolder.set('title', title);
        todoFolder.set('type', type);
        todoFolder.set('content', content);
        //todoFolder.set('number', 1);
        todoFolder.save().then(function (todo) {
            $rootScope.$apply(cb())
        }, function (error) {
            console.log('err:' + error);
        });
    }
    return {add: add}
}).factory('get_all_article', function ($rootScope) {
    var get_all = function (cb) {
        cb = cb || function () {
            }
        var query = new AV.Query('Article');
        query.find().then(function (data) {
            $rootScope.$apply(cb(data))
        }, function (error) {
            console.log('err:' + error)
        });
    }
    return {get_all: get_all};
}).factory('get_user_access_result', function ($rootScope) {
    var get_all = function (city,cb) {
        cb = cb || function () {
            }
        var query = new AV.Query('Scoring');
        query.equalTo('province', city);
        query.find().then(function (data) {
            $rootScope.$apply(cb(data))
        }, function (error) {
            console.log('err:' + error)
        });
    }
    return {get_all: get_all};
}).factory('get_article', function ($rootScope) {
    var call = function (id, cb) {
        cb = cb || function () {
            }
        var query = new AV.Query('Article');
        query.get(id).then(function (data) {
            $rootScope.$apply(cb(data))
        }, function (error) {
            console.log('err:' + error)
        });
    }
    return {call: call};
}).factory('change_article', function ($rootScope) {
    var updata = function (title, type, content, id, cb) {
        cb = cb || function () {
            }
        var todo = AV.Object.createWithoutData('Article', id);
        todo.set('title', title);
        todo.set('type', type);
        todo.set('content', content);
        todo.save().then(function (data) {
            $rootScope.$apply(cb())
        });
    }
    return {updata: updata};
}).factory('delete_leancloud', function (promptBox) {
    var call = function (className, id) {
        var todo = AV.Object.createWithoutData(className, id);
        todo.destroy().then(function (success) {
            promptBox.prompt("删除成功！")
        }, function (error) {
        });
    }
    return {call: call};
}).factory('promptBox', function ($mdDialog) {
    var prompt = function (data) {
        $mdDialog.show(
            $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('提示')
                .textContent(data)
                .ariaLabel('Offscreen Demo')
                .ok('确认')
                .openFrom({
                    top: -50,
                    width: 30,
                    height: 80
                })
                .closeTo({
                    left: 1500
                })
        );
    }
    return {prompt: prompt};
}).factory('tinymceSetting',function() {
    var setting = function () {

        var fileUploadControl = document.getElementById("photoFileUpload");
        tinymce.PluginManager.add("lineheight", function(t, e) {
            t.addButton("lineheight", function(){
                var items = [];
                items.push({text:'100%',value:'100%'});
                items.push({text:'150%',value:'150%'});
                items.push({text:'200%',value:'200%'});
                items.push({text:'250%',value:'250%'});

                return {
                    type : 'listbox',
                    text : "行间距",
                    values : items,
                    onselect:function(e){
                        if(e.control.settings.value){
                            var ed = tinymce.activeEditor;
                            var node = ed.selection.getNode();
                            var text = ed.selection.getContent({'format':'text'});
                            if (node && text) {
                                ed.dom.setStyle(node,'lineHeight',e.control.settings.value);
                            } else {
                                alert('请选择需要更改的内容');
                            }
                        }
                    }
                };
            })
        });
        tinymce.init({
            selector: 'textarea',
            height : 400,
            width: '95%',
            max_height: 600,
            element_format : 'html',
            language: "zh_CN",
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime table contextmenu paste imagetools lineheight textcolor colorpicker emoticons"
            ],
            toolbar: "insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | lineheight forecolor backcolor emoticons ",
            file_browser_callback_types: ['image','media'],
            font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
            color_picker_callback: function(callback, value) {
                callback('#FF00FF');
            },
            file_picker_callback: function (callback, value, meta) {
                fileUploadControl.click();
                fileUploadControl.onchange = function () {
                    console.log(fileUploadControl)
                    if (fileUploadControl.files.length > 0) {
                        var localFile = fileUploadControl.files[0];
                        var name = localFile.name;
                        var file = new AV.File(name, localFile);
                        file.save().then(function (file) {
                            console.log(file.url());
                            if (meta.filetype == 'image') {
                                callback(file.url(), {alt: '图片描述'});
                            }
                            //if (meta.filetype == 'media') {
                            //    callback(file.url, {source2: 'alt.ogg', poster: 'image.jpg'});
                            //}
                        }, function (error) {
                            alert("上传失败," + JSON.stringify(error));
                        });


                    } else {
                        alert('请选择文件上传')
                    }
                }
            }
        });

        //console.log(tinyMCE.activeEditor.getContent({format: 'raw'}))
    }
    return {setting:setting};
});