import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    onClick() {
        const { onClick, index } = this.props;
        if (onClick) {
            onClick(index);
        }
    }

    render() {
        return (
            <button className="square" onClick={() => this.onClick() }>
            {this.props.value && this.props.value}
      </button>
        );
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    onSquareClick(index) {
        const { squares } = this.state;
        const { secondPlayerActive, onPlayerMadeMove } = this.props;
        
        squares[index] =  secondPlayerActive ? 'O' : 'X';
        this.setState({
            squares,
        });
        
        if (onPlayerMadeMove) onPlayerMadeMove();
    }

    renderSquare(index) {
        return <Square
            index={index}
            value={this.state.squares[index]} 
            onClick={(index) => this.onSquareClick(index)}
        />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondPlayerActive: false,
        };
    }
    
    switchPlayer() {
        this.setState({
            secondPlayerActive: !this.state.secondPlayerActive, 
        });
    }

    render() {
        return (
            <div className="game">
        <div className="game-board">
          <Board
            secondPlayerActive={ this.state.secondPlayerActive }
            onPlayerMadeMove={ () => this.switchPlayer() }
            />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
