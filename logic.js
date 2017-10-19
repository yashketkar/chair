function logic(){
  N=5;
  chairs = Array.apply(null, Array(N)).map(function (_, i) {return i+1;});
  console.log(chairs);
  i=0;
  c=1;
  while(chairs.length>1){
    console.log("Removing: " + chairs[i] + " at " + i);
    chairs.splice(i, 1);
    i+=c;
    i=i%chairs.length;
    c+=1;
    console.log(chairs);
    if(c==5){
      // break;
    }
  }
}
logic();
