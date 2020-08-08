import React, { useContext } from 'react';
import { Container, Header, Content, Text, Left, Body, Right, View, Thumbnail, List, ListItem, Separator, Button } from 'native-base';
import Theme, { Style } from '../../Theme.style';
import { StatusBar, ViewStyle, TextStyle } from 'react-native';
//import { TouchableOpacity } from 'react-native';
//import LocationsService from '../services/LocationsService';
import { connect } from 'react-redux';
//import { selectLocation } from '../reducers/locationReducer';
import { Auth } from 'aws-amplify';
import UserContext from '../../contexts/UserContext'

const style = {
    content: [Style.cardContainer, {
        backgroundColor: 'black',
    }],
    header: [Style.header, {}],
    headerLeft: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50
    },
    headerBody: {
        flexGrow: 3,
        justifyContent: "center",
    } as ViewStyle,
    headerRight: {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 50,
        right: 6,
    },
    headerTitle: [Style.header.title, {
        width: "100%",
    }] as TextStyle,
    headerButtonText: [Style.header.linkText, {}],
    title: [Style.title, {
        marginTop: 130,
        marginBottom: 16,
    }],
    body: [Style.body, {
        marginBottom: 40,
    }],
    searchIcon: [Style.icon, {}],
    searchInput: {
        color: Theme.colors.white,
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.medium,
    },
    listItem2: {
        marginLeft: 0,
        borderColor: Theme.colors.gray2,
        backgroundColor: Theme.colors.background
    },
    listItem: {
        marginLeft: 0,
        borderColor: Theme.colors.gray2,
        backgroundColor: 'black'
    },
    listText2: {
        fontSize: Theme.fonts.medium,
        color: 'white',
        fontFamily: Theme.fonts.fontFamilyRegular,
        marginLeft: 16,
    },
    listText: {
        fontSize: 14,
        color: Theme.colors.grey4,
        fontFamily: Theme.fonts.fontFamilyBold,
        marginLeft: 16
    },
    listSubtext: {
        fontSize: Theme.fonts.smallMedium,
        color: Theme.colors.gray5,
        fontFamily: Theme.fonts.fontFamilyRegular,
    },
    listIcon: [Style.icon, {
        marginRight: 16,
        marginLeft: 16,
    }],
    listArrowIcon: [Style.icon, {
    }],
    headerText: {
        fontSize: 16,
        fontFamily: Theme.fonts.fontFamilyRegular,
        color: 'white',
        lineHeight: 24,
    }
}

interface Params {
    navigation: any;
}

function Account({ navigation }: Params): JSX.Element {

    const user = useContext(UserContext);

    async function updateUser(): Promise<void> {
        const user = await Auth.currentAuthenticatedUser();

        if (user.attributes.email_verified) {
            await Auth.updateUserAttributes(user, { 'custom:user_location': 'site_id' })
        }
        console.log('hi');
    }

    const items = [
        "Login",
        { id: "email", text: "Email", data: user?.userData?.email},
        { id: "pass", text: "Password", icon: Theme.icons.white.arrow, action: ()=>navigation.navigate('ChangePasswordScreen') },
        "Location",
        { id: "loc", text: "Location", icon: Theme.icons.white.arrow, data: user?.userData?.["custom:home_site"], action: ()=>navigation.navigate('LocationSelectionScreen') },
    ]

    return (
        <Container>
            <Header style={style.header}>
                <StatusBar backgroundColor={Theme.colors.black} barStyle="default" />
                <Left style={style.headerLeft}>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Thumbnail style={Style.icon} source={Theme.icons.white.arrowLeft} square></Thumbnail>
                    </Button>
                </Left>
                <Body style={style.headerBody}>
                    <Text style={style.headerTitle}>My Account</Text>
                </Body>
                <Right style={style.headerRight}>
                </Right>
            </Header>
            <Content style={style.content}>
                <View>
                    <List>
                        {items.map(item => {
                            if (typeof item === 'string') 
                                return (
                                    <ListItem key={item} style={[style.listItem, { height: 50, alignItems: 'flex-end', paddingBottom: 4 }]}>
                                        <Text style={style.listText}>{item}</Text>
                                    </ListItem>
                                )
                            return (
                                <ListItem
                                    key={item.id} style={style.listItem2}
                                    onPress={item.action ? item.action : () => null}>
                                    <Left>
                                        <View>
                                            <Text style={style.listText2}>{item.text}</Text>
                                        </View>
                                    </Left>
                                    <View style={{ maxWidth: '75%' }}>
                                        {item.data ? <Text numberOfLines={1} style={style.listText2}>{item.data}</Text> : null}
                                        {item.icon ? <Thumbnail style={style.listArrowIcon} source={item.icon} square></Thumbnail> : null}
                                    </View>
                                </ListItem>
                            )
                        })}
                    </List>
                </View>
            </Content>
        </Container>

    )
}

function mapStateToProps(state: { location: { location: any; }; }) {
    return {
        location: state.location.location
    }
}

export default connect(mapStateToProps)(Account);

