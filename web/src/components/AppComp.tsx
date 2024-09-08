import React, { useState, useEffect } from 'react';
import {
  MantineProvider,
  Center,
  Progress,
  Text,
  Box,
} from '@mantine/core';
import { rgba } from '@mantine/core';
import { fetchNui } from '../utils/fetchNui';

export default function AppComp() {
  const [progressValue, setProgressValue] = useState(0);
  const [progPlaceholder, setProgPlaceholder] = useState('Loading...');
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const handleMessage = (event: { data: { action: any; data: any; }; }) => {
      const { action, data } = event.data;
      console.log("Received NUI message: ", action);

      if (action === 'setVisible') {
        if (data) {
          setIsVisible(true);

        } else {

          setTimeout(() => setIsVisible(false), 500); 
        }
      }

      if (action === 'updateProgress') {
        setProgPlaceholder(data.label || 'Loading...');
        let duration = data.duration || 5000;
        let increment = 100 / (duration / 50);

        setProgressValue(0);
        if (intervalId !== undefined) {
          clearInterval(intervalId);
        }

        const newIntervalId = setInterval(() => {
          setProgressValue((oldProgress) => {
            const newProgress = (oldProgress ?? 0) + increment;
            if (newProgress >= 100) {
              clearInterval(newIntervalId);
              setTimeout(() => {
                fetchNui('hide-ui');
              }, 500);
              return 100;
            }
            return newProgress;
          });
        }, 50);

        setIntervalId(newIntervalId);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);




  return (
    <MantineProvider forceColorScheme="dark">
      <Center
        style={{
          height: '100vh',
          flexDirection: 'column',

        }}
      >
        <Box
          style={{
            width: 'fit-content',
            backgroundColor: rgba('#1A1B1E', 1.0),
            padding: '5px',
            borderRadius: '5px',
            marginTop: '53%',
            marginBottom: '5px',
          }}
        >
          <Text size="15px" fw={600} color="#ffffff">
            {progPlaceholder}
          </Text>
        </Box>

        <Progress
          value={progressValue}
          size="20"
          radius="4px"
          styles={() => ({
            root: {
              backgroundColor: rgba('#1A1B1E', 1.0),
              width: 400,
              marginBottom: '1rem',
            },
            bar: {
              transition: 'width 50ms ease',
              backgroundColor: rgba('#228BE6', 0.65),
            },
          })}
        />
      </Center>
    </MantineProvider>
  );
}
