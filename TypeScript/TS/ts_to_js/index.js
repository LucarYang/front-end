"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require("reflect-metadata");
// 3、方法装饰器
const Base = (name) => {
    const fn = (target) => {
        target.prototype.name = name;
        target.prototype.fn = () => {
            console.log('我是函数');
        };
    };
    return fn;
};
const Get = (url) => {
    const fn = (target, key, descriptor) => {
        console.log(target, key, descriptor);
        axios_1.default.get(url).then(res => {
            const key = Reflect.getMetadata('key', target);
            descriptor.value(key ? res.data[key] : res.data);
        });
    };
    return fn;
};
const Result = () => {
    const fn = (target, key, index) => {
        console.log(target, key, index); //{} getList 0
        Reflect.defineMetadata('key', 'result', target);
    };
    return fn;
};
const Name = (target, key) => {
    console.log(target, key); //{} uname
};
let Http = class Http {
    constructor() {
        this.uname = '属性装饰器';
    }
    getList(data) {
        console.log(data);
    }
    // @Post()
    create() { }
};
__decorate([
    Name,
    __metadata("design:type", String)
], Http.prototype, "uname", void 0);
__decorate([
    Get("https://viptest.sdo.com/wxcorp/eapi/user/appletinfo"),
    __param(0, Result()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Http.prototype, "getList", null);
Http = __decorate([
    Base('new name'),
    __metadata("design:paramtypes", [])
], Http);
const http = new Http();
// http.getList
