function matMul(m1,m2){
    var result = [];
    
    //console.log(m1,m2);
    for (var j = 0; j  < m2.length;j++){
        result[j] =[];
        for (var k = 0; k  < m1[0].length;k++){
            var sum =0;
            for (var i = 0; i  < m1.length;i++){
        sum += m1[i][k] * m2[j][i];
                   
        }
            //console.log(j);
            result[j].push(sum); 
            
        }
    }
    return result;
}


    
    
    
                