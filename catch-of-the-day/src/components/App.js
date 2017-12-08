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
            this.loadsamples = this.loadsamples.bind(this);
            this.addToOrder = this.addToOrder.bind(this);

            //get inital state
            this.state = {
                fishes: {},
                order: {}
            };
        }

        componentWillMount() {
            this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
                context: this,
                state: 'fishes'
            });
        }

        componentWillUnmount() {
            base.removeBinding(this.ref);
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
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory addFish={this.addFish} loadsamples={this.loadsamples} />
            </div>
        )
    }
}

export default App;