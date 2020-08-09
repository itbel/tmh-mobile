import React from 'react';
import { Button, Right, Text, Thumbnail } from 'native-base';
import { Theme } from '../../Theme.style';

const style = {
    button: {
        backgroundColor: Theme.colors.black,
        borderColor: Theme.colors.gray2,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        height: 63
    },
    text: {
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.medium,
    },
    icon: {
        width: Theme.icons.width,
        height: Theme.icons.height,
        marginRight: 15
    }
}

type AllButtonInput = {
    children: string;
    handlePress?(): any;
}

export default function AllButton({ children, handlePress }: AllButtonInput): JSX.Element {
    return (
        <Button full iconRight style={style.button} onPress={handlePress}>
            <Text uppercase={false} style={style.text}>{children}</Text>
            <Right>
                <Thumbnail source={Theme.icons.white.arrow} style={style.icon}></Thumbnail>
            </Right>
        </Button>
    )
}