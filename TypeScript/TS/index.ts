import axios from "axios"

import 'reflect-metadata'
// 3、方法装饰器
const Base=(name:string)=>{
  const fn:ClassDecorator=(target)=>{
    target.prototype.name=name
    target.prototype.fn=()=>{
      console.log('我是函数')
    }
  }
  return fn
}

const Get=(url:string)=>{
  const fn:MethodDecorator=(target,key,descriptor:PropertyDescriptor)=>{
    console.log(target,key,descriptor)
    axios.get(url).then(res=>{
      const key = Reflect.getMetadata('key',target)
      descriptor.value(key ? res.data[key] :res.data)
    })
  }
  return fn
}
const Result=()=>{
  const fn:ParameterDecorator =(target:any,key,index)=>{
    console.log(target,key,index) //{} getList 0
    Reflect.defineMetadata('key','result',target)
  }
  return fn
}

const Name:PropertyDecorator  =(target:any,key)=>{
  console.log(target,key) //{} uname
}

@Base('new name')
class Http{
  @Name
  uname:string
  constructor(){
    this.uname='属性装饰器'
  }
  @Get("https://viptest.sdo.com/wxcorp/eapi/user/appletinfo")
  getList(@Result() data:any){
    console.log(data)
  }
  // @Post()
  create(){}
}

const http=new Http() as any
// http.getList