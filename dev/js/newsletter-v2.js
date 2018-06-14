function masterDataNewsletter(){
    var jsonSaveDadosUser = {
        "whatsapp": $("#cl_whatsapp").val(),
        "email": $("#cl_email").val()
    };

    var urlSaveDadosUser = 'https://casaegaragem.vtexcommercestable.com.br/api/dataentities/NL/documents/';

    $.ajax({
        headers: {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(jsonSaveDadosUser),
        type: 'PATCH',
        url: urlSaveDadosUser,
        success: function (data) {
          console.log(data);
          $("div#messageSuccess").removeClass("hide");
          $("#cl_whatsapp").val("");          
          $("#cl_email").val("");
        //   alert("E-mail cadastrado com sucesso!");
          $('.modal-tapume').addClass('active');
        },
        error: function (data) {
          console.log(data);
          alert("Houve um erro ao cadastrar seu e-mail. Tente novamente mais tarde");
        }
    });
}