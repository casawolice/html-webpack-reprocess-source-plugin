function initString()
{
String.prototype.left=function(flag){
 
    if (typeof flag === "number") {
        return this.substr(0, flag);

    } else if (typeof flag === "string") {
         return this.substr(0, this.indexOf(flag));

    }
    return this;
}
String.prototype.leftBack=function(flag){
     if (typeof flag === "number") {
        return this.substr(0,this.length-flag);

    } else if (typeof flag === "string") {

         return this.substr(0,this.lastIndexOf(flag));

    }
    return this;

}
String.prototype.right=function(flag){
 
    if (typeof flag === "number") {
        return this.substr(flag);

    } else if (typeof flag === "string") {
         return this.substr(this.indexOf(flag)+flag.length);

    }
    return this;
}
String.prototype.rightBack=function(flag){
     if (typeof flag === "number") {
        return this.substr(this.length-flag);
    } else if (typeof flag === "string") {
         return this.substr(this.lastIndexOf(flag)+flag.length);
    }
    return this;

}
String.prototype.getParameter=function(pm,flag)
{
    if(flag===null || flag===undefined)flag="&";
    
    let rs=this.right(`${pm}=`);
     
     return  rs.indexOf(flag)>0 ? rs.left(flag) : rs ; 
    
}
String.prototype.trim=function(f="1"){
    f=String(f);
    let rs="";
    switch (f)
    {
       case "0":
       return this.replace(/\s*/g,"");
       break;

       case "1":
       return this.replace(/(^\s*)|(\s*$)/g,"");
       break;

       case "2":
       return this.replace(/^\s*/g,"");
       break;

       case "3":
       return this.replace(/\s*$/g,"");
       break;
    }
    
}

}
module.exports=initString();