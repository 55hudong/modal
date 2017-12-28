/**
 * Created by coffee on 08/02/2017.
 */

var fs = require("fs"),
    path = require("path"),
    rimraf = require("rimraf");

var webpackConfig = require("../../webpack.conf.js");

describe("webpack配置测试", function () {

    var testPath = "./testPath/";

    beforeEach(function () {

        fs.mkdirSync(testPath);

        function createModule(name, type) {
            fs.mkdirSync(path.join(testPath, name));
            switch(type){
                case 0:
                    fs.appendFile(path.join(testPath, name, "index.ts"));
                    break;
                case 1:
                    fs.appendFile(path.join(testPath, name, "index.js"));
                    break;
                case 2:
                    fs.appendFile(path.join(testPath, name, name+".ts"));
                    break;
                case 3:
                    fs.appendFile(path.join(testPath, name, name+".js"));
                    break;
            }
        }

        createModule("TestModule1", 0);
        createModule("TestModule2", 1);
        createModule("TestModule3", 2);
        createModule("TestModule4", 3);

    });

    afterEach(function () {
        // rimraf.sync(testPath);
    });

    it("读取文件模块入口", function () {

        var moduleList = webpackConfig.readEntryModule(testPath);

        expect(moduleList).toEqual({
            TestModule1: 'testPath/TestModule1/index.ts',
            TestModule2: 'testPath/TestModule2/index.js',
            TestModule3: 'testPath/TestModule3/TestModule3.ts',
            TestModule4: 'testPath/TestModule4/TestModule4.js'
        });

    });



});