import React from 'react';
import { getFunName} from '../helpers';

class StorePicker extends React.Component {
    // constructor( {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // })
    goToStore(event) {
        event.preventDefault();
        console.log("You Changed the URL");
    //first grab text
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`)
    //transittion from / to / store
        this.context.router.transitionTo(`/store/${storeId}`);

}
    render() {
        return ( 
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}> 
            { /* this is how you comment */ } 
            <h2>Please enter a store </h2>
            <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => { this.storeInput = input}} />
            <button type="submit" > Visit Store </button>  
            </form>
        )
    }
}

StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;