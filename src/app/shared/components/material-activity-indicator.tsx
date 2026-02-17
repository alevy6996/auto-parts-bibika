import { ActivityIndicator, Surface, SurfaceProps, useTheme } from 'react-native-paper';
import React from 'react';

interface MaterialActivityIndicatorProps {
    style?: SurfaceProps['style'],
    elevation?: SurfaceProps['elevation']
}

export const MaterialActivityIndicator = ({ style, elevation = 0 }: MaterialActivityIndicatorProps) => {
    const theme = useTheme();
    return (
        <Surface
            elevation={elevation}
            style={[{
                flex: 1,
                justifyContent: 'center'
            }, style]}
            theme={theme}
        >
            <ActivityIndicator theme={theme} size='large'/>
        </Surface>
    );
}