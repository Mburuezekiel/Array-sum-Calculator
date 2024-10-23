import React, { useState } from 'react';
//import './Calculator.css';  
function ArraySumCalculator() {
    const [numbers, setNumbers] = useState('');
    const [result, setResult] = useState('');
    const [visualizerSteps, setVisualizerSteps] = useState([]);
    const [error, setError] = useState('');

    const isValidNumber = (num) => {
        return !isNaN(num) && num.trim() !== '';
    };

    const calculateSum = () => {
        const input = numbers.trim();
        setResult('');
        setVisualizerSteps([]);
        setError('');

        if (!input) {
            setError('Please enter some numbers');
            return;
        }

        const numArray = input.split(',');
        const validNumbers = [];
        const invalidInputs = [];

        numArray.forEach((num, index) => {
            const trimmedNum = num.trim();
            if (isValidNumber(trimmedNum)) {
                validNumbers.push(parseFloat(trimmedNum));
            } else {
                invalidInputs.push(`${trimmedNum} (at position ${index + 1})`);
            }
        });

        if (invalidInputs.length > 0) {
            setError(`Invalid input(s): ${invalidInputs.join(', ')}`);
            return;
        }

        let sum = 0;
        const steps = [];
        validNumbers.forEach((num, index) => {
            const previousSum = sum;
            sum += num;
            steps.push(`Step ${index + 1}: ${previousSum} + ${num} = ${sum}`);
        });

        setResult(`Final Sum: ${sum}`);
        setVisualizerSteps(steps);
    };

    const useExample = () => {
        setNumbers('1, 2, 3, 4, 5');
    };

    const clearInput = () => {
        setNumbers('');
        setResult('');
        setVisualizerSteps([]);
        setError('');
    };

    return (
        <div className="calculator-container">
            <div className="calculator-header">
                <h1>Array Sum Calculator</h1>
                <p>Calculate the sum of numbers quickly and easily</p>
            </div>

            <div className="calculator-content">
                <div className="input-group">
                    <label className="input-label" htmlFor="numbers">
                        Enter numbers separated by commas
                    </label>
                    <input 
                        type="text" 
                        id="numbers" 
                        className="input-field" 
                        placeholder="e.g., 1, 2, 3, 4, 5" 
                        value={numbers}
                        onChange={(e) => setNumbers(e.target.value)}
                        autoComplete="off"
                    />
                </div>

                <div className="button-group">
                    <button onClick={calculateSum} className="btn btn-primary">
                        Calculate Sum
                    </button>
                    <button onClick={useExample} className="btn btn-secondary">
                        Use Example
                    </button>
                    <button onClick={clearInput} className="btn btn-secondary">
                        Clear
                    </button>
                </div>

                {error && (
                    <div className="result error">
                        {error}
                    </div>
                )}

                {result && (
                    <div className="result success">
                        {result}
                    </div>
                )}

                {visualizerSteps.length > 0 && (
                    <div className="visualizer">
                        {visualizerSteps.map((step, index) => (
                            <div key={index} className="visualizer-step">
                                {step}
                            </div>
                        ))}
                    </div>
                )}

                <div className="how-it-works">
                    <h2>How it works</h2>
                    <div className="steps">
                        <div className="step">
                            <span className="step-number">1</span>
                            Enter your numbers in the input field above
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            Numbers are validated to ensure they're valid
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            Each number is processed and converted
                        </div>
                        <div className="step">
                            <span className="step-number">4</span>
                            The calculator sums all valid numbers
                        </div>
                        <div className="step">
                            <span className="step-number">5</span>
                            Results are displayed with step-by-step breakdown
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArraySumCalculator;
