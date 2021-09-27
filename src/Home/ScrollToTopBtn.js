import React, { Component } from "react";
import './ScrollToTop.css';

//TODO: Fuite de mémoire quelque part ici...
export default class ScrollToTopBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
      scrollComponent: this
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", () => { this.state.scrollComponent.toggleVisibility(); });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", () => { this.state.scrollComponent.toggleVisibility(); });
  }

  toggleVisibility() {
    if (window.pageYOffset > 50) {
      this.setState({
        is_visible: true
      });
    } else {
      this.setState({
        is_visible: false
      });
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  render() {
    // const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {this.state.is_visible && (
          <div onClick={() => this.scrollToTop()}>
            <div id="message">Passer au contenu</div>
          </div>
        )}
      </div>
    );
  }
}
