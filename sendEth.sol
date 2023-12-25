// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract  sendEth {
    address sender;
    event transferDone(address indexed receiver,uint amount, address indexed sender,uint timestamp);

    
    function transferEth(address payable receiver,uint amount)external payable {

     require(amount>0,"amount should be greater than 0");
     sender=msg.sender;
     receiver.transfer(amount);   
     emit transferDone(receiver,amount,sender,block.timestamp);
    }
}