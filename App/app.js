var app = new Vue({
    el: '#app',
    data: {
        abilities: [],
        attributes: {
            weight: '',
            height: ''
        },
        name: '',
        pokeName: '',
        pokeImg: '',
        busy: false,
        busyEscrevendo: false,
        notFound: false,
        answer: ''
    },
    watch: {
        name: function () {
            this.answer = 'Esperando voce terminar de digitar...';
        }
    },
    methods: {
        async getPokemon() {
            this.answer = '';
            this.busy = true;
            this.name = this.name.toLowerCase();
            await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`, {
                body: null,
                method: "get"
            })
            .then(async (response) => {
                try {
                    const text = await response.text();
                    console.log("Debug antes de converter", text);

                    if (response.ok) {
                        const data = JSON.parse(text);
                        console.log("Debug do objeto data", data);
                        alert("OK!");
                        const nameCapitalized = this.capitalizeFirstLetter(this.name);
                        this.pokeName = nameCapitalized;
                        this.abilities = data.abilities;
                        this.attributes.weight = data.weight;
                        this.attributes.height = data.height;
                        this.pokeImg = data.sprites.front_default;
                        this.clearForm();
                    }
                    else {
                        alert("Um erro aconteceu na request!, Verifique o console");
                        this.notFound = true;
                    }
                } catch (error) {
                    console.error(error);
                }
            })
            .catch((error) => console.log(error));
            this.busy = false;
            this.busyEscrevendo = false;
            this.answer = '';
        },
        escrevendo(value) {
            if (value != '') {
                this.busyEscrevendo = true
            }
        },
        capitalizeFirstLetter(str) {
            const str2 = str.charAt(0).toUpperCase() + str.slice(1);
            return str2;
        },
        clearForm() {
            this.name = '';
        },
        // created: function () {
        //     this.getPokemon();
        // }
    }
})