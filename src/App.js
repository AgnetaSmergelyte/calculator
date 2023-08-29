import './App.css';
import {useState} from "react";

function App() {

    const [expression, setExpression] = useState('0');

    function addToExpression(value) {
        const numRegex = /[0-9]/;
        const prevDigit = expression[expression.length - 1];
        const prevPrev = expression[expression.length - 2];
        if (expression.length >= 22) {
            setExpression('       DIGIT LIMIT MET');
            return;
        }
        if (expression === '0' && value.match(numRegex)) {
            setExpression(value);
            return;
        }
        if (!value.match(numRegex) && prevDigit === value) {
            return;
        }
        if ((value === '*' && prevDigit === "/") || (value === '/' && prevDigit === "*")) {
            setExpression(expression.slice(0, -1) + value);
            return;
        }
        if (!value.match(numRegex) && !prevDigit.match(numRegex) && !prevPrev.match(numRegex)) {
            return;
        }
        if (value.match(numRegex) && prevDigit === '0' && !prevPrev.match(numRegex) && prevPrev !== '.') {
            setExpression(expression.slice(0, -1) + value);
            return;
        }
        setExpression(expression + value);
    }

    function calculate() {
        if (expression.length >= 22) {
            return;
        }
        let myExpression = expression;
        if (!expression[expression.length - 1].match(/[0-9]/)) {
            myExpression = expression.slice(0, -1);
            if (!myExpression[myExpression.length - 1].match(/[0-9]/)) {
                myExpression = myExpression.slice(0, -1);
            }
        }
        const result = eval(myExpression).toString()
        setExpression(result);
    }

    return (
        <div className="container">
            <div className="calculator">
                <div id="screen">{expression}</div>
                <div id="clear" onClick={() => setExpression('0')}>AC</div>
                <div className="operations" onClick={() => addToExpression('/')}>/</div>
                <div className="operations" onClick={() => addToExpression('*')}>x</div>
                <div className="numbers" onClick={() => addToExpression('7')}>7</div>
                <div className="numbers" onClick={() => addToExpression('8')}>8</div>
                <div className="numbers" onClick={() => addToExpression('9')}>9</div>
                <div className="operations" onClick={() => addToExpression('-')}>-</div>
                <div className="numbers" onClick={() => addToExpression('4')}>4</div>
                <div className="numbers" onClick={() => addToExpression('5')}>5</div>
                <div className="numbers" onClick={() => addToExpression('6')}>6</div>
                <div className="operations" onClick={() => addToExpression('+')}>+</div>
                <div className="numbers" onClick={() => addToExpression('1')}>1</div>
                <div className="numbers" onClick={() => addToExpression('2')}>2</div>
                <div className="numbers" onClick={() => addToExpression('3')}>3</div>
                <div className="operations" id="equals" onClick={calculate}>=</div>
                <div id="zero" className="numbers" onClick={() => addToExpression('0')}>0</div>
                <div className="numbers" onClick={() => addToExpression('.')}>.</div>
            </div>
        </div>
    );
}

export default App;
