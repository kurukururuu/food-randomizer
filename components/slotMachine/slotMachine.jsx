import { Component, createRef } from 'react'
import styles from './slotMachine.module.scss'

class slotMachine extends Component {
  constructor(props) {
    super(props);
    this.state = { rolling: false, selectedFood: 0 };

    // get ref of dic onn which elements will roll
    this.slotRef = [createRef()];
  }

  get foods() {
    return this.props.foods.data
  }

  roll = () => {
    this.setState({
      rolling: true
    });
    setTimeout(() => {
      this.setState({ rolling: false });
    }, 700);

    // looping through all 3 slots to start rolling
    this.slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = this.triggerSlotRotation(slot.current);
      // if (selected) { this.setState({selectedFood: i}) }
      // this.setState({ [`food${i + 1}`]: selected });
    });
  };

  // this will create a rolling effect and return random selected option
  triggerSlotRotation = ref => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(
      Math.random() * this.foods.length
    );
    // console.log(randomOption, this.state.selectedFood)
    // if (randomOption === this.state.selectedFood) {
    //   this.triggerSlotRotation(ref)
    //   return
    // }
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    return this.foods[randomOption];
  };

  render() {
    return (
      <>
        <div className={styles.slot}>
          <div className={styles.slotWrapper}>
            <div className={styles.container} ref={this.slotRef[0]}>
              {this.foods.map((food, idx) => {
                return (
                  <div key={idx}>{food.name}</div>
                )
              })}
            </div>
          </div>
        </div>

        <button
          className={[styles.roll, this.state.rolling ? styles.rolling : ''].join(' ')}
          onClick={!this.state.rolling ? this.roll : undefined}
          disabled={this.state.rolling}
        >
          {this.state.rolling ? "Rolling..." : "Roll for food"}
        </button>
      </>
    )
  }
}

export default slotMachine