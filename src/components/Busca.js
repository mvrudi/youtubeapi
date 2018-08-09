import React from 'react';
import {SERVER_API, API_KEY, RESULTS} from './Server';

class Busca extends React.Component {
    constructor(props) {
        super(props);

    this.state = {
        count: 0,
        nextPage: undefined,
        lastPage: undefined,
        stringBusca: '',
        infoVideo: []
        }
    }

    nextPage = (prevState) => {

    if (this.state.infoVideo == '') {
        alert ('Não existem vídeos para listar');
        return
    }

    this.setState((prevState) => {
        return {
            count: prevState.count + 1
        };
    });

    let pageToken = this.state.nextPage;
    let stringBusca = this.state.stringBusca;

    //Nova Busca Paginacao Next
 
        fetch (`${SERVER_API}${stringBusca}&maxResults=${RESULTS}&pageToken=${pageToken}&key=${API_KEY}`)
        .then ((response) => response.json())
        .then ((data) => { 

            if (this.state.lastPage == undefined) {
                this.setState ({ lastPage: this.state.nextPage });
            } else {
                this.setState ({ lastPage: this.state.lastPage });
            }

            this.setState ({ nextPage: data.nextPageToken });

            const resultado = data.items.map((videos,i) => {
                let src = "https://www.youtube.com/embed/"+(videos.id.videoId);
                return(
                    <div key={i}>
                        <div className="card" id="card">
                            <div className="card-body">
                                <b>Canal:</b> {videos.snippet.channelTitle}
                            </div>
                        </div>
                        <iframe id="frame" width="420" height="315" src={src} allowFullScreen="allowFullScreen"> </iframe> 
                    </div>
                )
            })
            this.setState ({ infoVideo: resultado })
        })
        }

    lastPage = (prevState) => {

        if (this.state.infoVideo == '') {
            alert ('Não existem vídeos para listar');
            return
        }

        if (this.state.count <= 0) {
            this.setState ({count: 0})
        } else {
            this.setState((prevState) => {
            return {
                count: prevState.count - 1
            };
        })};

        if (this.state.lastPage == undefined || this.state.count ==0 ) {
            alert ('Você está na primeira página');
            return
        }

        let pageToken = this.state.lastPage;
        let stringBusca = this.state.stringBusca;
    
        //Nova Busca Paginacao Last
            
            fetch (`${SERVER_API}${stringBusca}&maxResults=${RESULTS}&pageToken=${pageToken}&key=${API_KEY}`)
            .then ((response) => response.json())
            .then ((data) => { 
    
                this.setState ({ lastPage: this.state.nextPage });
                this.setState ({ nextPage: data.nextPageToken });
                
    
                 const resultado = data.items.map((videos,i) => {
                    let src = "https://www.youtube.com/embed/"+(videos.id.videoId);
                    return(
    
                        <div key={i}>
                            <div className="card" id="card">
                                <div className="card-body">
                                    <b>Canal:</b> {videos.snippet.channelTitle}
                                </div>
                            </div>
                            <iframe id="frame" width="420" height="315" src={src} allowFullScreen="allowFullScreen"> </iframe> 
                        </div>
                    )
                })
                this.setState ({ infoVideo: resultado })
            })

    }

    //Listar os videos buscados 

    listaVideos = (e) => {
        e.preventDefault();
        if (!e.target.elements.busca.value) {
            alert ('Por favor, informe um valor válido para a sua busca.')
            return
        }

        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });

       let stringBusca=e.target.elements.busca.value;
       this.setState ({ stringBusca });
        
       fetch (`${SERVER_API}${stringBusca}&maxResults=${RESULTS}&key=${API_KEY}`)
        .then ((response) => response.json())
        .then ((data) => { 
            this.setState ({ count: 0 });
            this.setState ({ nextPage: data.nextPageToken });
            
            if (this.state.lastPage == undefined) {
                this.setState ({ lastPage: data.nextPage })
            }

            const resultado = data.items.map((videos,i) => {
                let src = "https://www.youtube.com/embed/"+(videos.id.videoId);
                return(

                     <div key={i}>

                     <div className="card" id="card">
                        <div className="card-body">
                            <b>Canal:</b> {videos.snippet.channelTitle}
                        </div>
                    </div>
                        <iframe id="frame" width="420" height="315" src={src} allowFullScreen="allowFullScreen"> </iframe> 
                     </div>
                )
            })
            this.setState ({ infoVideo: resultado })
        }
    )}

    render() {
        return (
            <div>
                <form id="busca" onSubmit={this.listaVideos}>
                    <input id="input-text" className="form-control" type="text" name="busca" placeholder="Digite sua busca"/>
                    <button id="botao" className="btn btn-danger btn-lg">Buscar no Youtube</button>
                </form>

                <div id="resultado">
                    {this.state.infoVideo}
                </div>
                <div id="paginacao">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li onClick={this.lastPage}  className="page-item"><a className="page-link" href="#">Página Anterior</a></li>
                        <li onClick={this.nextPage} className="page-item"><a className="page-link" href="#">Próxima Página</a></li>
                    </ul>
                </nav>
            </div>
            </div>
        )
    }
}

export default Busca;