import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { FC, useEffect, useState } from 'react';
import { Easing, Pressable, View } from 'react-native';
import { NavigationItemModel } from '../Interfaces/NavigationItemModel';
import { NavigationItemConstructor } from './NavigationItemConstructor';
import { WorkspaceItemStyle, TextStyle, ViewBox } from './NavigationStyles/workspaceItemStyle';
import { ViewArrow } from './NavigationStyles/navigationOmni';
import { useReduxDispatch, useReduxSelector } from '../../AppState/Store';
import { setChekedItemId } from '../../AppState/Navigation/NavigationSlice';
import { INavigationDAL } from '../DataAccessLayer/INavigationDAL';
import { IWithToggleAnimation } from '../../customHooks/withAnimations/types';
import { interractAnimation, loopAnimationBackFourth } from '../../customHooks/withAnimations/animations';
// import { IWithToggleAnimation } from '../../customHooks/withAnimations/types';
// import { interractAnimation } from '../../customHooks/withAnimations/Animations';
interface IWorkspaceItemView {
    id: string;
    title: string;
    children: NavigationItemModel[];
    fetchChildren: () => void;
    dataAccessLayer: INavigationDAL;
};

const WorkspaceItemView: FC<IWorkspaceItemView> = ({ id, title, children, fetchChildren, dataAccessLayer }) => {
    const [checked, setChecked] = useState(false);
    const [model, setModel] = useState<NavigationItemModel[]>();
    const { searchString, chekedItemId } = useReduxSelector(state => state.Navigation);
    const dispatch = useReduxDispatch();

    useEffect(() => {
        setModel(children)
        fetchChildren()
    }, [checked, searchString]);


    function PressEvent() {
        setChecked(!checked);
        dispatch(setChekedItemId(id))
    };

    function RenderChildren() {
        if (checked || searchString != '') {
            return model === undefined
                ? <View />
                : model.map(item => new NavigationItemConstructor(item, dataAccessLayer).onRender())
        } else {
            return <View />
        };
    };

    function setHighlight() {
        if (chekedItemId === id && checked) {
            return true;
        } else return false;
    };


    const translationConfig: IWithToggleAnimation = {
        duration: 300,
        nativeDriver: true,
        easing: Easing.linear,
        outPutRange: ["0deg", "360deg"],
      };
    
   
    
      const interpolation =
      loopAnimationBackFourth(translationConfig);
      console.log(interpolation)

      const transform = {
          transform: [{
            rotate: interpolation
          }]
      }


    return (
        <Pressable onPress={() => { children[0] === undefined ? () => { } : PressEvent() }}>
            <ViewBox checked={checked}>
                {/* <Image style={NavigationOmni.iconMain} source={require('************')} Или source={{ uri: '*********' }}/> */}
                <View style={{ borderWidth: 1, borderColor: "red", width: 15, height: 15, marginRight: 10 }}></View>
                <TextStyle checked={setHighlight()} numberOfLines={1} ellipsizeMode='tail'>{title}</TextStyle>
                {children[0] === undefined ? <View /> :
                    //   <Pressable
                    //   onPress={() => {
                    //     toggleTranslationInputRange();
                    //     // toggleRotationInputRange();
                    //   }}
                      
                    //   style={{ margin: "auto" }}
                    // >
                    <ViewArrow /* style={transform}  */><FontAwesomeIcon  icon={faChevronDown} /></ViewArrow>
                    // </Pressable>
                    }
            </ViewBox>
            <View>
                {RenderChildren()}
            </View>
        </Pressable>
    );
};

export default WorkspaceItemView;