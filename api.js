        const t = document.createElement('template');        
        let boton;
        
        t.innerHTML=`
        <link rel="stylesheet" href="./style.css">
        <div>
            <h1>RICK AND MORTY</h1>
            <div class="header">
            <input placeholder="Ingresa ID del personaje"/>
            <button id="bnormal">Buscar</button>
            <button id="baleatorio">Aleatorio Comienzo/Parar</button></br></br>
            </div>

        <div class="nombres">
            <div>
            <label class="etiqueta">"ID": </label>
            <label id="ide"/></label></br>
            </div>


            <div>
            <label class="etiqueta">"Name": "</label>
            <label id="nombre"/></label></br>
            </div>

            <div>
            <label class="etiqueta">"Status": </label>
            <label id="estado"/></label></br>
            </div>

            <div>
            <label class="etiqueta">"Species": </label>
            <label id="especie"/></label></br>
            </div>

            <div>
            <label class="etiqueta">"Type" : </label>
            <label id="tipo"/></label></br>
            </div>

            <div>
            <label class="etiqueta">"Gender:" </label>
            <label id="genero"/></label></br>
            </div>

            <div>
            <label class="etiqueta">"Origin:" </label>
            <label id="origen"/></label></br>
            </div>


            <div>
            <label class="etiqueta">"Image" :</label></br>
            <div class="img" id="imagen"/></div></br>
            </div>
        </div>

            

        `;

        class NeoCharacter extends HTMLElement{


            constructor(){
                super();
                this._shadowRoot= this.attachShadow({'mode': 'open'});
                this._shadowRoot.appendChild(t.content.cloneNode(true));
            }

            static get observedAttributes(){
                return ['id', 'name', 'status','species','type','genero','image'];
            }

            connectedCallback(){

                this.ide = this._shadowRoot.querySelector('#ide');
                this.nombre = this._shadowRoot.querySelector('#nombre');
                this.estado = this._shadowRoot.querySelector('#estado');
                this.especie = this._shadowRoot.querySelector('#especie');
                this.tipo = this._shadowRoot.querySelector('#tipo');
                this.genero = this._shadowRoot.querySelector('#genero');
                this.origen = this._shadowRoot.querySelector('#origen');
                this.imagen = this._shadowRoot.querySelector('#imagen');

                this.input = this._shadowRoot.querySelector('input');
                this.b = this._shadowRoot.querySelector('#bnormal');
                this.b1 = this._shadowRoot.querySelector('#baleatorio');

                this.b.addEventListener('click', () => {

                fetch('https://rickandmortyapi.com/api/character/' + this.input.value + '/')
                .then(resp => {
                    if(resp.ok){
                        return resp.json();
                    }
                    else if (resp.status === 404){
                        return Promise.reject('El nro de personaje no existe')
                    }
                })
                .then(data => {

                    //console.log(data);

                    this.ide.innerHTML= data.id;
                    this.nombre.innerHTML= data.name;
                    this.estado.innerHTML= data.status;
                    this.especie.innerHTML= data.species;
                    this.tipo.innerHTML= data.type;
                    this.genero.innerHTML= data.gender;
                    this.origen.innerHTML= data.origin.name;
                    this.imagen.innerHTML= `<img src="${data.image}"/>`;

                })
                .catch(error => alert('Lo sentimos. ' + error));
                })


                this.b1.addEventListener('click', () => {


                    if(boton) {
                        clearInterval(boton);
                        boton = null;
                    }
                    else {
                        boton =setInterval(async() =>{   
                        const numero = Math.floor((Math.random()*671)+1);

                const resp = await fetch('https://rickandmortyapi.com/api/character/' + numero + '/')
                .then(resp => resp.json())
                .then(data => {

                    //console.log(data);

                    this.ide.innerHTML= data.id;
                    this.nombre.innerHTML= data.name;
                    this.estado.innerHTML= data.status;
                    this.especie.innerHTML= data.species;
                    this.tipo.innerHTML= data.type;
                    this.genero.innerHTML= data.gender;
                    this.imagen.innerHTML= `<img src="${data.image}"/>`;

                })

            }, 6000);}
                })
                
            }

            disconnectedCallback(){

                if(confirm("Desea cerrar la ventana?")){
                    window.close();
                }
                else{
                    console.log("Se ha eliminado el elemento componente. Favor actualizar la página");   
                }
            }


            attributeChangedCallback(name, oldValue, newValue){
                
                console.log(name, oldValue, newValue);

                fetch('https://rickandmortyapi.com/api/character/' + newValue + '/')
                .then(resp => resp.json())
                .then(data => {

                    //console.log(data);


                    this.ide.innerHTML= data.id;
                    this.nombre.innerHTML= data.name;
                    this.estado.innerHTML= data.status;
                    this.especie.innerHTML= data.species;
                    this.tipo.innerHTML= data.type;
                    this.genero.innerHTML= data.gender;
                    this.imagen.innerHTML= `<img src="${data.image}"/>`;
                })
            }
        }

window.customElements.define('neo-character',NeoCharacter);
