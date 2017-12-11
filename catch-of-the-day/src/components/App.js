import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
        constructor() {
            super();

            this.addFish = this.addFish.bind(this);
            this.updatedFish = this.updatedFish.bind(this);
            this.removeFish = this.removeFish.bind(this);
            this.loadsamples = this.loadsamples.bind(this);
            this.addToOrder = this.addToOrder.bind(this);
            this.removeFromOrder = this.removeFromOrder.bind(this);

            //get inital state
            this.state = {
                fishes: {},
                order: {}
            };
        }

        componentWillMount() {
            //this runs before app is rendered
            this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
                context: this,
                state: 'fishes'
            });

            //check if there is anything in local storage
            const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

            if (localStorageRef) {
                //update our app componet's order state
                this.setState({
                    order: JSON.parse(localStorageRef)

                });
            }

        }

        componentWillUnmount() {
            base.removeBinding(this.ref);
        }

        componentWillUpdate(nextProps, nextState) {
            localStorage.setItem(`order-${this.props.params.storeId}`,
             JSON.stringify(nextState.order));
        }
        

        addFish(fish) {
            //update our state
            const fishes = {...this.state.fishes};
            //add in new fish
            const timestamp = Date.now();
            fishes[`fish-${timestamp}`] = fish;
            //set state
            this.setState({ fishes });
        }

        updatedFish(key, updatedFish) {
            const fishes = {...this.state.fishes};
            fishes[key] = updatedFish;
            this.setState({ fishes });
        }

        removeFish(key) {
            const fishes = {...this.state.fishes};
            fishes[key] = null;
            this.setState({ fishes });
        }

        loadsamples() {
            this.setState({
                fishes: sampleFishes
            });
        }

        addToOrder(key) {
            //Tke copy of state
            const order = {...this.state.order};
            //upadte or add new number
            order[key] = order[key] + 1 || 1;
            // update state
            this.setState({ order });
        }

        removeFromOrder(key) {
            const order = {...this.state.order};
            delete order[key];
            this.setState({ order });
        }

        render() {
        return(
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market"/>
                    <ul className="list-of-fishes">
                        {
                            Object
                            .keys(this.state.fishes)
                            .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)    
                        }
                    </ul>
                </div>
                <Order
                 fishes={this.state.fishes} 
                 order={this.state.order} 
                 params={this.props.params}
                 removeFromOrder={this.removeFromOrder}
                 />
                <Inventory 
                    addFish={this.addFish} 
                    removeFish={this.removeFish}
                    loadsamples={this.loadsamples} 
                    fishes={this.state.fishes}
                    updatedFish={this.updatedFish}
                    storeId={this.props.params.storeId}
                    />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default App;