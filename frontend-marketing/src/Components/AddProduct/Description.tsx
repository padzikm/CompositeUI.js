import React from 'react';
import FormField from '@service/branding/FormField';

type State = {
    description?: string
    error?: string
}

type Props = {
    onChange: (value: string | undefined, isValid: boolean) => void
}

export class ProductDescription extends React.Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = { description: '' }
    }

    componentDidMount() {
        this.props.onChange(this.state.description, false);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        let isValid = value.length > 0;
        let error: string | undefined;
        if (!isValid)
            error = 'description cannot be empty'
        
        this.setState({description: value, error})

        this.props.onChange(value, isValid);
    }

    render() {
        let { description, error } = this.state;
        return <FormField onValueChange={this.handleChange} value={description} error={error} id={'addProductDescription'} label={'product description'} />
    }
}