


export function generateId(prefix:string=''):string{
    return prefix+"/"+Date.now()+'/needuuid';
}


export function saveIntoArray(item:Object, ary:Array<any>, idKey:string='_id'):Array<any>{
  var i = getIndexById(item[idKey],ary,idKey);
      if(i== -1)
        i=ary.length;
      return [  ...ary.slice(0, i),
                Object.assign({},item),
                ...ary.slice(i + 1) ]
}

export function getIndexById(id:string, ary:any, idKey:string = '_id'):number{
   for(var i = 0; i < ary.length; i++){
        if(id === ary[i][idKey])
          return i;
      }

      //if we don't have a match return null
      return -1;
}

