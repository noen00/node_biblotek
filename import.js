let test=false;
document.getElementById('booknavn').addEventListener('input', function() {
let bok = this.value;
console.log('bok', bok);
});
function testa(){
test=true
}

export { test } 


<script src="index.mjs"></script>