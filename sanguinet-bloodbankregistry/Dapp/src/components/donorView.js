import React from 'react';
import { Table } from 'reactstrap';
import OrbitHandler from '../orbitdb';

let orbit;

class DonorView extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            donors : []
        }
        orbit = new OrbitHandler();
        this.viewDonors = this.viewDonors.bind(this);
    }

    viewDonors = async () =>{
        this.setState ({
            donors : await orbit.getData()
        })  
        console.log(this.state);       
    }

    renderTableData() {
        return this.state.donors.map ((info, index) => {
           const { _id, place, bloodType } = info;
           let blood;
           switch (bloodType) {
               case 'aee8736c2b78925066991632c3a5fc38b2a79cf7b083146654ca958b2a99b7ca' : blood = 'A+';
               break;
               case '4211f2cc8e2bb21e8cdb3b02a144b829d52c0995bbacc830469707265c89df69' : blood = 'B+';
               break;
               case '9f3e574f2f77304b6de8e1d898ac2af7ca973d633c7dd0a90aaf1183d3d809d1' : blood = 'AB+';
               break;
               case '3e58f539705dd3fe5f6ae4084f4fc618190c8fc4abddbfc850c6f94adfb09a71' : blood = 'A-';
               break;
               case '74d21bff3d44b6a85557f8dd88255dd3b97090cb7d8de9d4e81e0b85b95b30d2' : blood = 'B-';
               break;
               case 'f038f85ee256bd361a7d86c1c7ea9f9fd851c23a3078df8ee4ed015a9f347cad' : blood = 'AB-';
               break;
               case '4aa8d4a10f941836b0c764d54421edf48c76cafb4b17ffe338b0340194515d89' : blood = 'O+';
               break;
               case '4220c3ef2cf794cc8066219b43dc94431d5cd3645f70eb356897ce2eab276c86' : blood = 'O-';
               break;
               default : blood = 'invalid'
               break;
           }
           return (
              <tr key = { _id }>
                 <td>{ _id }</td>
                 <td>{ blood }</td>
                 <td>{ place }</td>
              </tr>
           )
        })
    }

    render = () => {
        return(
            <div className = 'container'>
                <Table>
                    <thead>
                        <tr>
                        <th>Donor ID</th>
                        <th>Blood Type</th>
                        <th>Place</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTableData () }
                    </tbody>
                </Table>
                <button type = "submit" className = "btn btn-primary" onClick = {this.viewDonors}>View Donors</button>
            </div>
        )
    }
}

export default DonorView;