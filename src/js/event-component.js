export class EventComponent extends HTMLElement {
  render() {
    this.innerHTML = `
      <style>
        .event-component {
          background-color: rgba(50, 0, 255, 0.75);
          border-radius: 0.25rem;
          position: absolute;
          overflow: hidden;
          display: flex;
          padding: 0 0.25rem;
        }
        
        .event-component__title {
          font-size: 0.75rem;
          color: white;
        }
      </style>
      <div class="event-component" style="width: ${this.getAttribute(
        "width"
      )}%; top: ${this.top}%; height: ${
      this.height
    }%; left: ${this.getAttribute("left")}%">
        <span class="event-component__title">
        ${this.getAttribute("title")}
        </span>
      </div>
    `;
  }

  get top() {
    if (!this.hasAttribute("start")) {
      throw new Error("start attribute is required");
    }

    return (100 / 24) * this.getAttribute("start");
  }

  get height() {
    if (!this.hasAttribute("start") || !this.hasAttribute("end")) {
      throw new Error("start and end attributes are required");
    }

    return (100 / 24) * (this.getAttribute("end") - this.getAttribute("start"));
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ["width", "left"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }
}

customElements.define("event-component", EventComponent);
