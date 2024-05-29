export const axios={
    get<T>(url:string):Promise<T>{
        return new Promise((resolve)=>{
            const xhr=new XMLHttpRequest()
            xhr.open('GET',url)

            xhr.onreadystatechange=()=>{
                if(xhr.readyState==4&&xhr.status==200){
                    JSON.parse(xhr.responseText)
                    setTimeout(()=>{
                        resolve(JSON.parse(xhr.responseText))
                    },1000)
                }
            }
            xhr.send(null)
        })
    }
}