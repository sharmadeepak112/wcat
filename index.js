#!/usr/bin/env node


const fs=require("fs");
let arguments=process.argv.slice(2);

let flags=[];
let filenames=[];
let secondaryArguments=[];

for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }
    else if(i[0]=="%"){
        secondaryArguments.push(i.slice(1));
      
    }
    else{
        filenames.push(i);
    }
}
console.log(flags);
console.log(secondaryArguments);
console.log(filenames);


//print data of given file
// if(flags.length==0 && filenames.length!=0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }
// else{
   //remove spaces
   
// for(let flag of flags){
//     if(flag=="-rs"){
        
//         for(let file of filenames){
//           let fileData=fs.readFileSync(file,"utf-8");
//           let fileDataArray=fileData.split(" ");
//           //console.log(fileData); 
//           //console.log(fileDataArray); 
//           console.log(fileDataArray.join("")); 
//         }
//     }
// }
// }


function removeAll(string,removalData){
    return string.split(removalData).join("");
 }


for(let file of filenames){
    let fileData=fs.readFileSync(file,"utf-8");
    for(let flag of flags){
         //remove spaces
        if(flag=="-rs"){
            fileData=removeAll(fileData," ");
        }
         //remove new line
        if(flag=="-rn"){
            fileData=removeAll(fileData,"\r\n");
        }
        //remove special character
        if(flag=="-rsc"){    
            // let temp="";       
            //  for(let character of fileData){
            //    if(character.charCodeAt(0)>=65 && character.charCodeAt(0)<=90 || character.charCodeAt(0)>=97 && character.charCodeAt(0)<=122){
            //        temp+=character;
            //    }
            //  }
            //  fileData=temp;

            for(let secondaryArgument of secondaryArguments){
                fileData=removeAll(fileData,secondaryArgument);
            } 
        }  
         //Sequence
         if(flag=="-s"){
            fileData= addSequence(fileData);
           
         }  

         if(flag=="-sn"){
            fileData= addSequenceTnel(fileData);
            
         }

         if(flag=="-rel"){
            fileData= removelExtraLine(fileData);
          
         }
    }
    console.log(fileData);

}

function addSequence(fileData){
     let contentArr=fileData.split("\r\n");
     for(let i in contentArr){
         contentArr[i]=[i+1]+" "+contentArr[i];
     }
     return contentArr;
}

function addSequenceTnel(fileData){
    let contentArr=fileData.split("\r\n");
    let count=1;
    for(let i in contentArr){
        if(contentArr[i]!=""){
        contentArr[i]=count+". "+contentArr[i];
        count++;
        }
    }
    return contentArr;
}

function removelExtraLine(fileData){
    let contentArr=fileData.split("\r\n");
    let data=[];
    //for(let i in contentArr){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""  ){
            contentArr[i]=null;
            
        }
        if(contentArr[i]=="" && contentArr[i-1]==null  ){
       
            contentArr[i]=null;
        }
    }

    for(let i in contentArr){
        if(contentArr[i]!=null){
            data.push(contentArr[i]);
        }
    }
    return data;
}


//command
/*     
// npm init   
//  npm install fs     or  npm i fs   
//             npm run wcat       
//  npm link   
// npm run wcat a.txt -rsc "%how"        
*/