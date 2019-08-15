import React from 'react';
import FormField from '@service/branding/FormField';

type State = {
    name?: string
    error?: string
}

type Props = {
    onChange: (value: string | undefined, isValid: boolean) => void
}

export class ProductName extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = { name: '' }
    }

    componentDidMount() {
        this.props.onChange(this.state.name, false);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let isValid = value.length > 0 && value.indexOf(' ') < 0;
        let error: string | undefined;
        if (!isValid)
            error = 'name cannot be empty or contain whitespaces'
        
        this.setState({name: value, error})

        this.props.onChange(value, isValid);
    }

    render() {
        let { name, error } = this.state;
        return <FormField onValueChange={this.handleChange} value={name} error={error} id={'addProductName'} label={'product name'} />
    }
}