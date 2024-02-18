import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Polygon, Line, Text, Svg } from 'react-native-svg';
import { useSpring, animated } from 'react-spring';

const AnimatedPolygon = animated(Polygon);

const RadarChart = () => {
    const size = 180;
    const svgSize = size + 40;
    const center = svgSize / 2;
    const radius = size * 0.4;
    const angles = [0, 60, 120, 180, 240, 300];
    const layers = 5;

    const initialAttributeValues = {
        Strength: 50,
        Agility: 50,
        Intelligence: 50,
        Endurance: 50,
        Wisdom: 50,
        Charisma: 50,
    };

    const [attributeValues, setAttributeValues] = useState(initialAttributeValues);

    // Function to convert attribute values to SVG polygon points
    const calculatePoints = (values) => {
        return angles.map((angle, index) => {
            const attributeKeys = Object.keys(values);
            const value = values[attributeKeys[index]] / 100;
            const x = center + radius * value * Math.cos((angle - 90) * (Math.PI / 180));
            const y = center + radius * value * Math.sin((angle - 90) * (Math.PI / 180));
            return `${x},${y}`;
        }).join(' ');
    };

    // Animated spring for the points
    const springProps = useSpring({
        to: { points: calculatePoints(attributeValues) },
        from: { points: calculatePoints(initialAttributeValues) },
        config: { duration: 800 },
    });

    // Function to generate new attribute values randomly
    const generateNewValues = () => {
        let newValues = {};
        Object.keys(attributeValues).forEach((key) => {
            newValues[key] = attributeValues[key] + (Math.random() < 0.5 ? -1 : 1) * 20;
            newValues[key] = Math.max(0, Math.min(100, newValues[key]));
        });
        return newValues;
    };

    // UseEffect to trigger a new animation cycle after each one completes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setAttributeValues(generateNewValues());
        }, 800); 

        return () => clearTimeout(timeoutId);
    }, [attributeValues]);
    
    return (
        <View style={{ opacity: 0.8 }}>
            <Svg height={svgSize} width={svgSize}>
                {/* Grid */}
                {Array.from({ length: layers }).map((_, layerIndex) => (
                    <Polygon
                        key={layerIndex}
                        points={angles.map(angle => {
                            const x = center + radius * (layerIndex + 1) / layers * Math.cos((angle - 90) * (Math.PI / 180));
                            const y = center + radius * (layerIndex + 1) / layers * Math.sin((angle - 90) * (Math.PI / 180));
                            return `${x},${y}`;
                        }).join(' ')}
                        fill="none"
                        stroke="#555"
                        strokeWidth="0.5"
                    />
                ))}

                {/* Axis Lines */}
                {angles.map((angle, index) => (
                    <Line
                        key={index}
                        x1={center}
                        y1={center}
                        x2={center + radius * Math.cos((angle - 90) * (Math.PI / 180))}
                        y2={center + radius * Math.sin((angle - 90) * (Math.PI / 180))}
                        stroke="#777"
                        strokeWidth="1"
                    />
                ))}

                 {/* Animated Data Layer */}
                 <AnimatedPolygon
                    points={springProps.points}
                    fill="rgba(255, 255, 255, 0.2)"
                    stroke="cyan"
                    strokeWidth="2"
                />

                {/* Labels */}
                {Object.keys(initialAttributeValues).map((label, index) => {
                    const angle = angles[index];
                    const x = center + (radius + 20) * Math.cos((angle - 90) * (Math.PI / 180));
                    const y = center + (radius + 20) * Math.sin((angle - 90) * (Math.PI / 180));
                    return (
                        <Text
                            key={label}
                            x={x}
                            y={y}
                            fill="white"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                        >
                            {label}
                        </Text>
                    );
                })}
            </Svg>
        </View>
    );
};

export default RadarChart;
