function fact(num){
			if(num<=1){
				return 1
			}else{
				return num*fact(num-1)
			}
			
			
		}
		var aa=fact;
		console.log(fact(1));   // 1
		fact=function(){
			return 0
		}
		console.log(fact())   // 0
		console.log(aa())   // NaN
