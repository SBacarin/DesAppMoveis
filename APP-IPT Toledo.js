// APP-IPT Toledo - Versão 02
// Função Formulário em faz o encapsulamento de tudo e posteriormente é renderizada 
function Formulario() {
  // Definindo as variáveis, decidir fazer 1 só array com 7 atributos
  const [formulario,setFormulario] = React.useState({
  estabelecimento: '',
  categoria:'',
  produto:'',
  marca:'',
  unidade:'',
  valor:0,
  data:''   
  });
  let [mensagem, setMensagem] = React.useState("Enviando...");
  const [exibirInformacoes, setExibirInformacoes] = React.useState(false);
  const [registros, setRegistros] = React.useState([]);

  // constante reiniciar, que será invocada quando finalizar o formulário 
  const reiniciar = () => {
    setFormulario({
      estabelecimento: '',
      categoria: '',
      produto: '',
      marca: '',
      unidade: '',
      valor: 0,
      data: ''
    });
    setMensagem('Enviando...');
    setExibirInformacoes(false);
    setRegistros(false)
  };
    
  // constante verificar o preenchimento que verifica se está em branco , sem prenchimento
	const verificarPreenchimento = () => {
    return (
      formulario.estabelecimento &&
      formulario.categoria &&
      formulario.produto &&
      formulario.marca &&
      formulario.unidade &&
      formulario.valor !== '' &&
      formulario.data
    );}

	//constante para verificar se  NOME DO PRODUTO + ESTABELECIMENTO COMERCIAL não estão duplicados 
	const verificarDuplicidade = () => {
    const duplicado = registros.some(
      (registro) =>
        registro.estabelecimento === formulario.estabelecimento &&
        registro.produto === formulario.produto
    );
    return duplicado;
  };

  //constante enviar que é acionada pelo botão e 
  //   1. verifica duplicidade;
  //   2. chama a constante exibir informações 
  //   3. reinicia
  const enviar = () => {
       if (verificarDuplicidade()) 
    	 {alert("Estabelecimento e Produto já estão registrados anteriormente.");}
       else {
    	 // Verificar se todos os campos obrigatórios estão preenchidos
    	 if (
       		formulario.estabelecimento &&
          formulario.categoria &&
      		formulario.produto &&
      		formulario.marca &&
      		formulario.unidade &&
      		formulario.valor &&
      		formulario.data !== '' 
          ){
          setRegistros([...registros, formulario]);    
          setExibirInformacoes(true);
          console.log("Depois de enviar:", formulario, registros);
          reiniciar(); } 
          else {
          alert("Por favor, preencha todos os campos antes de enviar.");
          }
       }
    };
 
 console.log("exibirInformacoes:", exibirInformacoes);
 console.log("registros:", registros);

return (
  	<div >
      <label htmlFor="estabelecimento" style={{ display: 'flex', marginBottom: '10px' }}>
      Informe o nome do estabelecimento comercial:
      </label>
      <input 
        type="text"
        value={formulario.estabelecimento} 
        id="estabelecimento"
        onChange={event => setFormulario({...formulario,estabelecimento:event.target.value})}/>
   
      <label htmlFor="categoria" style={{ display: 'flex', marginBottom: '10px' }} >
      Informe a categoria do produto(ex:alimenticio,limpeza,etc.):
      </label>
      <input 
        type="text"
        value={formulario.categoria} 
        id="categoria"
        onChange={event => setFormulario({...formulario,categoria:event.target.value})}/>
             
     <label htmlFor="produto" style={{ display: 'flex', marginBottom: '10px' }} >
     Informe o nome do Produto:
     </label>
      <input 
        type="text"
        value={formulario.produto} 
        id="produto"
        onChange={event => setFormulario({...formulario,produto:event.target.value})}/>
             
      <label htmlFor="marca" style={{ display: 'flex', marginBottom: '10px' }} >
      Informe a marca do Produto:
      </label>
      <input 
        type="text"
        value={formulario.marca} 
        id="marca"
        onChange={event => setFormulario({...formulario,marca:event.target.value})}/>
               
      <label htmlFor="unidade" style={{ display: 'flex', marginBottom: '10px' }} >
      Informe a unidade de medida(ex: kg, ml, etc.):
      </label>
      <input 
        type="text"
        value={formulario.unidade} 
        id="unidade"
        onChange={event => setFormulario({...formulario,unidade:event.target.value})}/>
                
      <label htmlFor="valor" style={{ display: 'flex', marginBottom: '10px' }} >
      Informe o valor do produto:
      </label>
      <input 
        type="text"
        value={formulario.valor} 
        id="valor"
        onChange={event => setFormulario({...formulario,valor:event.target.value})}/>
      
     <label htmlFor="data" style={{ display: 'flex', marginBottom: '10px' }} >
     Data de registro:
     </label>
      <input 
        type="text"
        value={formulario.data} 
        id="data"
        onChange={event => setFormulario({...formulario,data:event.target.value})}/>
         
     <button type="button" onClick={enviar}>
       ENVIAR
     </button>
 
     {exibirInformacoes &&
        registros.map((registro, index) => (
          <div key={index}>
            <p>Estabelecimento: {registro.estabelecimento}</p>
            <p>Categoria: {registro.categoria}</p>
            <p>Produto: {registro.produto}</p>
            <p>Marca: {registro.marca}</p>
            <p>Unidade: {registro.unidade}</p>
            <p>Valor: {registro.valor}</p>
            <p>Data: {registro.data}</p>
          </div>
        ))}
 
   </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('app-IPT')); 
root.render(<Formulario />);
