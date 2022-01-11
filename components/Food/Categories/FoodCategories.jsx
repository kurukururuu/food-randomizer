import { Component } from "react";
import connect from 'react-watcher'

class FoodCategories extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.onFoodTypeChanged = props.onFoodTypeChanged
  }

  handleSelectedType = (e) => {
    this.onFoodTypeChanged(e.target.value)
    this.setState({selected: e.target.value})
  }

  get foodTypes() {
    return this.props.foodTypes || []
  }

  componentDidMount() {
    const { watch } = this.props;
    watch('foodTypes', (newValue) => {
      // New value assigned, you can use this to dispatch a user fetch action or
      // any other Redux action dispatch or function call.
    });
  }

  render() {
    return (
      < div className="mx-auto">
        <div className="font-semibold mb-6">Food Category</div>
        <div className="mb-6 flex justify-center">
          {this.foodTypes.data.map((type,idx) => {
            return (
              <label key={idx} className={['flex items-center hover:cursor-pointer', idx > 0 ? 'ml-4' : ''].join(' ')}>
                {/* <input value={type} type="checkbox" className="mr-2" onChange={this.handleSelectedType} /> */}
                {/* <span>{type}</span> */}
                <div className={['p-4 w-48 rounded-2xl hover:border-2 hover:border-blue-400', this.state.selected === type ? 'border-2 border-blue-400 bg-blue-200 bg-opacity-25' : 'border-2 border-transparent'].join(' ')}>
                  <div className="flex justify-between items-center">
                    <div className="text-lg font-bold">{type}</div>
                    {this.state.selected === type
                      ? (
                        <div className="text-blue-400 rounded-full border border-blue-500 w-4 h-4 text-xs flex items-center justify-center bg-blue-300 bg-opacity-40">&#10003;</div>
                        )
                      : ''
                    }
                    <input value={type} type="checkbox" className="hidden" onChange={this.handleSelectedType} />
                  </div>
                  <span>Foods</span>
                </div>
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(FoodCategories)