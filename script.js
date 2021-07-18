let bill = 0;
let perPersonCost = 0;
let perPersonTotal = 0;
let disc = 0;
let noOfPerson = 0;
let emptyPriceField = false;
let emptycustomField = false;
/***********************button click event**************/
$('button').on('click',(e)=>{
    let btn_value = $(e.currentTarget).text();
    if(btn_value==='Reset'){
        location.reload();
    }else{
        emptyPriceField = Validate('#price');
        if(!emptyPriceField){            
            let noOfDigit = btn_value.length - 1;
            disc = btn_value.slice(0,noOfDigit);
            $('.buttons button').css({'background-color':'hsl(183, 100%, 15%)','color':'hsl(189, 41%, 97%)'});
            $(e.currentTarget).css({'background-color':'hsl(172, 67%, 45%)','color':'hsl(183, 100%, 15%)'});         
            $('#custom').css('border','none');
            $('#people').css('border','2px solid hsl(172, 67%, 45%)');
            $('.left-portion span').css('display','none');
            result(disc);            
        }    
    }    
})
/*******************result calculation***********/
result =(disc)=>{
   bill = parseFloat($('#price').val());
   noOfPerson =  parseFloat($('#people').val());
   if(isNaN(noOfPerson) || noOfPerson == 0){
        noOfPerson = 1;
    }   
   perPersonCost = parseFloat(((bill * disc)/100).toFixed(2));
   $('#per-person').text(`$${(perPersonCost/noOfPerson).toFixed(2)}`);
   perPersonTotal = parseFloat(((bill + perPersonCost)/noOfPerson)).toFixed(2);
   $('#total').text(`$${perPersonTotal}`);
}
/*************keypress events**************/
$('#price').on('keyup',()=>{
    emptyPriceField = Validate('#price');
    if(!emptyPriceField){
        result(disc); 
    }    
})
$('#people').on('keyup',()=>{
    Validate('#people');
    result(disc); 
})
$('#custom').on('keyup',()=>{
    $('.buttons button').css({'background-color':'hsl(183, 100%, 15%)','color':'hsl(189, 41%, 97%)'});
    emptycustomField = Validate('#custom');
    disc = parseFloat($('#custom').val());
    if(!emptycustomField){
        result(disc); 
    }
})
/**********field validation**********/
Validate=(field)=>{
    if(isNaN((parseFloat($(field).val()))) || (parseFloat($(field).val())) == 0){
        $(field).css('border','2px solid rgb(209, 109, 89)');
        if(field === '#people'){
            console.log('not ok');
            $('.left-portion span').css('display','block');
        }
        if(field === '#price'){
            $('#per-person').text(`$0.00`);
            $('#total').text(`$0.00`);
            return true;
        }
        if(field === '#custom'){
            $('#per-person').text(`$0.00`);
            $('#total').text(`$0.00`);
            return true
        }
    }else{
        $(field).css('border','2px solid hsl(172, 67%, 45%)');
        if(field === '#people'){
            $('.left-portion span').css('display','none');
        }
    }
}