import React, { Component } from 'react';
import PopupComponent from './popup';
import { form } from 'reactstrap';
import OrbitHandler from '../orbitdb';
import { initialize } from 'zokrates-js';
import { sha256 } from 'js-sha256';
import ipfs from "../ipfs";

let orbit;

class Form extends Component {
    constructor() {
        super();
        this.state = {
            place: null,
            amount: null,
            bloodType: null,   
            artifacts : null,
            keypair : null,
            computationResult : null,
            verifier : null,
            proof : null,
            modal : false,
            password : null,
            consent : null,
            buffer : null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePop = this.handlePop.bind(this);
        this.handleFile = this.handleFile.bind (this);
        orbit = new OrbitHandler();
        
    }

    handlePop () {
        this.setState ({
            modal : false
        })
        window.location.reload (true);
    }

    handleFile (event) {
        let file = event.target.files[0];
        let reader = new window.FileReader ();
        reader.readAsArrayBuffer (file);
        reader.onload = () => this.convertToBuffer(reader)
    }

    convertToBuffer = async(reader) => {
          let buff = await Buffer.from(reader.result);
          this.setState({
              buffer : buff,
              password : sha256 (reader.result)
            }, () => {
                console.log(this.state.password);
                console.log(this.state.buffer);
            });
      };

    async handleChange(event) {
        const { name, value } = event.target
        let values
        if (name === "bloodType") {
            if (value === '') {
                values = '';
            }
            else {
                values = sha256 (value);
            }
        }
        else {
            values = value;
        }
        this.setState({
            [name]: values,
            amount : "25000"
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.bloodType === null || this.state.bloodType === '') {
            alert("Please select you blood group");
        }
        else {
            const sleep = (milliseconds) => {
                return new Promise(resolve => setTimeout(resolve, milliseconds))
            }
            await ipfs.add(this.state.buffer, (res, ipfsHash) => {
                //console.log("Result",ipfsHash);
                console.log("IPFS HASH",ipfsHash);
                //setState by setting ipfsHash to ipfsHash[0].hash 
                this.setState({ 
                    consent : ipfsHash[0].hash 
                }, () => {
                    console.log("Done path");
                });
            })
            await sleep (300);
            let id = await orbit.getId();
            console.log(id);
            let place, blood;
            switch (this.state.place) {
                case 'Banglore': place = "6697110103108111114101";
                    break;
                case 'Mumbai': place = "771171099897105";
                    break;
                case 'Pune': place = "8011711010132";
                    break;
                case 'Delhi': place = "68101108104105";
                    break;
                default: place = "0";
            }

            switch (this.state.bloodType) {
                case 'O+': blood = 11143;
                    break;
                case 'O-': blood = 11145;
                    break;
                case 'AB+': blood = 979843;
                    break;
                case 'AB-': blood = 979845;
                    break;
                case 'A+': blood = 9743;
                    break;
                case 'A-': blood = 9745;
                    break;
                case 'B+': blood = 9843;
                    break;
                case 'B-': blood = 9845;
                    break;
                default: blood = 0;
            }

            initialize().then((provider) => {

                // Compilation
                let artifacts = provider.compile("def main(field DonorPlace, field DonorAmount, private field DonorID, private field BloodType) -> (field) :\n "+
                    "field a = if DonorPlace == 6697110103108111114101 then 1 else 0 fi \n "+
                    "field b = if DonorAmount == 25000 then 1 else 0 fi \n "+
                     "field c = a*b \n "+
                     "field o1 = if BloodType == 11143 then 1 else 0 fi \n " +
                     "field o0 = if BloodType == 11145 then 1 else 0 fi \n "+
                     "field a1 = if BloodType == 9743 then 1 else 0 fi \n "+
                     "field a0 = if BloodType == 9745 then 1 else 0 fi \n "+
                     "field b1 = if BloodType == 9843 then 1 else 0 fi \n "+
                     "field b0 = if BloodType == 9845 then 1 else 0 fi \n "+
                     "field ab1 = if BloodType == 989743 then 1 else 0 fi \n "+
                     "field ab0 = if BloodType == 989745 then 1 else 0 fi \n "+
                     "field blood = o1 + o0 + a1 + a0 + b1 + b0 + ab1 + ab0 \n "+
                     "field d = if c*DonorID*blood == DonorID then 1 else 0 fi \n "+
                     "return d", "main", () => { });

                // Generate setup keypair
                let keypair = provider.setup(artifacts.program);

                // Computation
                let computationResult = provider.computeWitness(artifacts, [ place, this.state.amount, JSON.stringify(id), JSON.stringify(blood) ]);

                // Export verifier
                let verifier = provider.exportSolidityVerifier(keypair.vk, true);

                // Generate proof
                let proof = provider.generateProof(artifacts.program, computationResult.witness, keypair.pk);

                this.setState ({
                    artifacts : artifacts,
                    keypair : keypair,
                    computationResult : computationResult,
                    verifier : verifier,
                    proof : proof,
                    modal : true
                  }, () =>
                     orbit.putData(this.state),
                    console.log('Current State is: ' + JSON.stringify(this.state))
                  );
                /* console.log("artifacts " + artifacts);
                console.log("keypair " + keypair);
                console.log("computationResult " + computationResult);
                console.log("verifier " + verifier);
                console.log("proof " + proof); */
            });
        }
    }

    render() {

        return (
            <div className='container'>
                <h1>
                    Fill in the details below
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label>Place</label>
                        <input
                            name="place"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                            className="form-control"
                            id="donorPlace"
                            placeholder="Enter your place"
                            required
                        />
                    </div>
                    <div className="form-group row">
                        <label>Blood Group</label>
                        <select className = "form-control" name = "bloodType" id = "donorBlood" onChange = {this.handleChange}>
                            <option value = ''>Select your blood group</option>
                            <option>A+</option>
                            <option>B+</option>
                            <option>AB+</option>
                            <option>O+</option>
                            <option>A-</option>
                            <option>B-</option>
                            <option>AB-</option>
                            <option>O-</option>
                        </select>
                    </div>
                    <div className="form-group row">
                        <label>Proof of Consent</label>
                        <input
                            type="file"
                            name="consent"
                            onChange={this.handleFile}
                            className="form-control"
                            id="consent"
                            required
                        />
                        <a href='./ConsentForm.docx' download>Click to download the consent form</a>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <PopupComponent mod = {this.state.modal} handle = {this.handlePop} password = {this.state.password}/>
            </div>
        );
    }
}

export default Form;