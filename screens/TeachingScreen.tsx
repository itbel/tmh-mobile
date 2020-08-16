import React, { useState, useEffect } from 'react';
import { Theme, Style } from '../Theme.style';
import { Container, Text, Button, Content, Left, Right, Header, View, Body } from 'native-base';
import moment from 'moment';
import { StatusBar, Image, TouchableOpacity, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import AllButton from '../components/buttons/AllButton';
import TeachingListItem from '../components/teaching/TeachingListItem';
import ActivityIndicator from '../components/ActivityIndicator';
import { FlatList } from 'react-native-gesture-handler';
import SermonsService from '../services/SermonsService';
import SeriesService from '../services/SeriesService';
import SpeakersService from '../services/SpeakersService';
import { loadSomeAsync } from '../utils/loading';
import { LoadSeriesListData } from '../services/SeriesService';
import { TeachingStackParamList } from '../navigation/MainTabNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

const style = {
    content: [Style.cardContainer, {
        backgroundColor: Theme.colors.gray1,
        paddingLeft: 0,
        paddingRight: 0,
    }],
    header: [Style.header, {
    }],
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
        flexBasis: 50
    },
    headerTitle: [Style.header.title, {
        width: "100%",
    }] as TextStyle,

    categoryTitle: [Style.categoryTitle, {
        marginTop: 16
    }],
    categorySection: {
        backgroundColor: Theme.colors.black,
        paddingTop: 16,
        marginBottom: 16,
    },
    listContentContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },

    horizontalListContentContainer: {
        marginTop: 16,
        alignItems: "center"
    } as ViewStyle,
    lastHorizontalListItem: {
        marginRight: 16,
    },
    seriesThumbnailContainer: {
        width: 295,
        height: 454,
        marginLeft: 10,
        marginRight: 10
    },
    seriesThumbnail: {
        width: "100%",
        height: 295 * (1248 / 1056),
    },
    seriesDetailContainer: {
        alignItems: "center",
        marginTop: 16,
    } as ViewStyle,
    seriesDetail1: {
        fontFamily: Theme.fonts.fontFamilyBold,
        fontSize: Theme.fonts.medium,
        color: Theme.colors.white,
        textAlign: "center"
    } as TextStyle,
    seriesDetail2: {
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.small,
        color: Theme.colors.gray5,
    },

    highlightsText: {
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.medium,
        color: Theme.colors.gray5,
        marginLeft: 16,
        marginTop: -10,
    },
    highlightsThumbnail: {
        width: 158,
        height: 88,
        marginLeft: 16,
    },
    teacherContainer: {
        alignItems: "center",
        marginLeft: 16,
        maxWidth: 96,
    } as ViewStyle,
    teacherThumbnailContainer: {
        height: 96,
        width: 96,
        borderRadius: 96,
        borderColor: Theme.colors.gray3,
        borderWidth: 1,
    },
    teacherThumbnail: {
        position: 'absolute',
        top: -1,
        left: -1,
        width: 96,
        height: 96,
        borderRadius: 96,
        overflow: "hidden",
    } as ImageStyle,
    teacherDetail1: {
        fontFamily: Theme.fonts.fontFamilyRegular,
        fontSize: Theme.fonts.small,
        color: Theme.colors.gray5,
        textAlign: 'center',
        marginTop: 3,
    } as TextStyle,
}

interface Params {
    navigation: StackNavigationProp<TeachingStackParamList>;
}

interface SeriesData extends LoadSeriesListData {
    loading: boolean;
}

export default function TeachingScreen({ navigation }: Params): JSX.Element {

    const [recentTeaching, setRecentTeaching] = useState({ loading: true, items: [], nextToken: null });
    const [recentSeries, setRecentSeries] = useState<SeriesData>({ loading: true, items: [], nextToken: null });
    const [highlights, setHighlights] = useState({ loading: true, items: [], nextToken: null });
    const [speakers, setSpeakers] = useState({ loading: true, items: [], nextToken: null });

    const loadRecentSermonsAsync = async () => {
        loadSomeAsync(SermonsService.loadRecentSermonsList, recentTeaching, setRecentTeaching, 5);
    }
    const loadHighlightsAsync = async () => {
        loadSomeAsync(SermonsService.loadHighlightsList, highlights, setHighlights, 5);
    }
    const loadSpeakersAsync = async () => {
        loadSomeAsync(SpeakersService.loadSpeakersList, speakers, setSpeakers);
    }
    const loadRecentSeriesAsync = async () => {
        loadSomeAsync(SeriesService.loadSeriesList, recentSeries, setRecentSeries, 5);
    }

    useEffect(() => {
        loadRecentSeriesAsync();
        loadRecentSermonsAsync();
        loadHighlightsAsync();
        loadSpeakersAsync();
    }, [])

    const width = Dimensions.get('window').width;
    const contentOffset = (width - 313) / 2;

    const getSeriesDate = (series: any) => {
        return moment(series.startDate || moment()).format("YYYY");
    }

    const getTeachingImage = (teaching: any) => {
        const thumbnails = teaching.Youtube.snippet.thumbnails;
        if (thumbnails.standard) {
            return thumbnails.standard.url;
        } else if (thumbnails.high) {
            return thumbnails.high.url;
        }
    }

    const getSpeakerImage = (speaker: any) => {
        return `https://www.themeetinghouse.com/static/photos/staff/${speaker.name.replace(/ /g, '_')}_app.jpg`
    }

    const renderSeriesSwipeItem = (item: any) => {
        console.log('swipe', item)
        if (item.item.loading) {
            return <ActivityIndicator />
        }
        return (
            <TouchableOpacity key={item.item.id} onPress={() => navigation.push('SeriesLandingScreen', { item: item.item })} style={style.seriesThumbnailContainer}>
                <Image source={{ uri: item.item.image }} style={style.seriesThumbnail}></Image>
                <View style={style.seriesDetailContainer}>
                    <Text style={style.seriesDetail1}>{item.item.title}</Text>
                    <Text style={style.seriesDetail2}>{getSeriesDate(item.item)} &bull; {item.item.videos.items.length} episodes</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <Container>
            <Header style={style.header}>
                <StatusBar backgroundColor={Theme.colors.black} barStyle="default" />
                <Left style={style.headerLeft}>
                </Left>
                <Body style={style.headerBody}>
                    <Text style={style.headerTitle}>Teaching</Text>
                </Body>
                <Right style={style.headerRight}>
                    <Button transparent>
                        {/* <Thumbnail style={Style.icon} source={Theme.icons.white.user} square></Thumbnail> */}
                    </Button>
                </Right>
            </Header>

            <Content style={style.content}>

                <View style={style.categorySection}>
                    <SideSwipe
                        contentContainerStyle={style.horizontalListContentContainer}
                        data={recentSeries?.items?.concat({ loading: true })}
                        itemWidth={315}
                        style={{ width: "100%" }}
                        contentOffset={contentOffset}
                        renderItem={renderSeriesSwipeItem}
                        onEndReachedThreshold={0.2}
                        onEndReached={loadRecentSeriesAsync}
                    />
                    <AllButton handlePress={() => { navigation.push('AllSeriesScreen') }}>All series</AllButton>
                </View>


                <View style={style.categorySection}>
                    <Text style={style.categoryTitle}>Recent Teaching</Text>
                    <View style={style.listContentContainer}>
                        {recentTeaching.loading &&
                            <ActivityIndicator animating={recentTeaching.loading} />
                        }
                        {!recentTeaching.loading &&
                            recentTeaching.items.map((teaching: any) => (
                                <TeachingListItem
                                    key={teaching.id}
                                    teaching={teaching}
                                    handlePress={() =>
                                        navigation.push('SermonLandingScreen', { item: teaching })
                                    } />
                            ))}
                    </View>
                    <AllButton handlePress={() => { navigation.push('AllSermonsScreen') }}>All sermons</AllButton>
                </View>


                <View style={style.categorySection}>
                    <Text style={style.categoryTitle}>Highlights</Text>
                    <Text style={style.highlightsText}>Short snippets of teaching</Text>
                    <FlatList
                        contentContainerStyle={style.horizontalListContentContainer}
                        horizontal={true}
                        data={highlights.items}
                        renderItem={({ item, index, separators }) => (
                            <Image
                                style={[style.highlightsThumbnail, index === (highlights.items.length - 1) ? style.lastHorizontalListItem : {}]}
                                source={{ uri: getTeachingImage(item) }}
                            ></Image>
                        )}
                        onEndReached={loadHighlightsAsync}
                        onEndReachedThreshold={0.8}
                        ListFooterComponent={() => (
                            <ActivityIndicator />
                        )}
                    ></FlatList>
                </View>


                <View style={style.categorySection}>
                    <Text style={style.categoryTitle}>Popular Sermons</Text>
                    <View style={style.listContentContainer}>
                        {recentTeaching.items.map((teaching: any) => (
                            <TeachingListItem
                                key={teaching.id}
                                teaching={teaching}
                                handlePress={() =>
                                    navigation.push('SermonLandingScreen', { item: teaching })
                                } />
                        ))}
                    </View>
                    <AllButton>More popular sermons</AllButton>
                </View>


                <View style={style.categorySection}>
                    <Text style={style.categoryTitle}>Teachers</Text>
                    <FlatList
                        contentContainerStyle={style.horizontalListContentContainer}
                        horizontal={true}
                        data={speakers.items}
                        renderItem={({ item, index, separators }: any) => (
                            <View style={style.teacherContainer}>
                                <View style={style.teacherThumbnailContainer}>
                                    <Image style={[style.teacherThumbnail, index === (speakers.items.length - 1) ? style.lastHorizontalListItem : {}]} source={{ uri: getSpeakerImage(item) }}></Image>
                                </View>
                                <Text style={style.teacherDetail1}>{item.name}</Text>
                            </View>
                        )}
                        onEndReached={loadSpeakersAsync}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={() => (
                            speakers.loading ? <ActivityIndicator /> : null
                        )}
                    ></FlatList>
                    <AllButton>All teachers</AllButton>
                </View>
            </Content>
        </Container>
    )
}