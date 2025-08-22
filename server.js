import express from 'express' ;
import princesas from './src/data/princesas.js' ;

const app = express();
const serverPort= 3000;

app.get("/", (req, res) => {
    res.send ("Bem-vindos(as) ao reino mágico das Princesas Disney! ✨👑") ;
});

app.get ("/princesas", (req, res) =>{
    res.json (princesas) ;
});

app.get ("/princesas/:id" , (req,res) =>{
    let id = req.params.id;

    id = parseInt (id)
    const princesa = princesas.find (b => b. id === id);

    if (princesa) {
        res.status (200).json (princesa) ;
    } else {
        res.status (404).son ({
            mensagem: "Ops! Princesa não encontrada 👑❌"
        })
    }
});

app.get ("/princesas/nome/:nome", (req, res) => {
    let nome = req.params.nome.toLowerCase() ;

    const princesasEncontradas =  princesas.filter (b =>b.nome.toLowerCase().includes (nome)) ;

    if (princesasEncontradas.length > 0){
        res.status (200).json (princesasEncontradas) ;
    } else {
        res.status (400).json ({
            mensagem: "Ops!Parece que o nom dessa princesa não existe! ❌👑"
        })
    }
}) ;

app.get ("/princesas/reino/:reino", (req, res) => {
    let reino = req.params.reino.toLowerCase();

    const princesasReino = princesas.filter (b => b.reino.toLowerCase().includes(reino)) ;

    if (princesasReino.length> 0) {

        res.status (200).json
        (princesasReino) ;
    } else {
        res.status (404).json ({
            mensagem: "Ops! Reino não encontrado!🏰"
        })
    }

})

app.get ("/princesas/ativa/nao" , (req, res) => {
    const resultado = princesas.filter ((b) => !b.ativa) ;

    if (resultado) {
        res.status (200).json  (resultado)
    }else {
        res.status (404).json ({ erro: "Ops! Nenhuma princesa encontrada!👸"})
    }
}) ;


app.listen(serverPort, () => {
    console.log (`API do Mundo Mágico das Princesas Funcionando 👸! http://localhost:${serverPort}`)
});
