import React ,{Component} from 'react';
import {View ,Text,Button, TextInput} from 'react-native';

export default class TestComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            inputA:0,
            inputB:0,
            inputC:0,
            total:""
        }
    }

    setInput = (value ,type) =>{

        console.log("value"+value+"type="+type);
        if(type == "A"){
            this.setState({inputA:value},()=>{
                this.calculate();
            });
        }
        if(type== "B"){
            this.setState({inputB:value},()=>{
                this.calculate();
            });
        }
        if(type == "C"){
            this.setState({inputC:value},()=>{
                this.calculate();
            });
        }


    }

    calculate = () =>{

        var total;
        var a= this.state.inputA;
        var b= this.state.inputB;
        var c= this.state.inputC;

        total = parseInt(a) + parseInt(b) ;

        this.setState({inputC:total.toString()});

        

    }

    render(){
        return(
           <View>
                <TextInput 
                    value={this.state.inputA}
                    placeholder="Enter A"
                    onChangeText ={(value)=>{this.setInput(value,"A")}} />

                <TextInput 
                    value={this.state.inputB}
                    placeholder="Enter B"
                    onChangeText ={(value)=>{this.setInput(value,"B")}} />

                <TextInput 
                    value={this.state.inputC}
                    placeholder="Enter C"
                    onChangeText ={(value)=>{this.setInput(value,"C")}} />


                {/* <Button title="ADD" onPress={()=>{this.calculate()}} /> */}


            </View> 
                
           
        )
    


}
}