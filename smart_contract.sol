pragma solidity ^0.4.19;


contract EnergyMarket {
    uint public value;
    address public producer;
    address public consumer;
    enum State { Created, Locked, Inactive }
    State public state;

    function purchase() public payable {
        producer = msg.sender;
        value = msg.value / 2;
        require((2 * value) == msg.value);
    }

    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier onlyBuyer() {
        require(msg.sender == consumer);
        _;
    }

    modifier onlySeller() {
        require(msg.sender == producer);
        _;
    }

    modifier inState(State _state) {
        require(state == _state);
        _;
    }

    event Aborted();
    event PurchaseConfirmed();
    event ItemReceived();

    function abort()
        public
        onlySeller
        inState(State.Created)
    {
        Aborted();
        state = State.Inactive;
        producer.transfer(this.balance);
    }

    function confirmPurchase()
        public
        inState(State.Created)
        condition(msg.value == (2 * value))
        payable
    {
        PurchaseConfirmed();
        consumer = msg.sender;
        state = State.Locked;
    }

    function confirmReceived()
        public
        onlyBuyer
        inState(State.Locked)
    {
        ItemReceived();
        state = State.Inactive;

        consumer.transfer(value);
        producer.rtransfer(this.balance);
    }
}
