import React, { useState } from "react"
import { Checkbox, Divider, Input } from "native-base";
import { ScrollView, Text, View } from "react-native";
import { SearchResult } from "./SearchResult";
import { useReduxSelector } from "../../AppState/Store";
import { SearchFilter } from "../DataAccessLayer/SearchFilter";
import { ISearchBarProps } from "../Interfaces/ISearchBarProps";

/**
 * @SearchBar 
 * Functional component provides handle user events and render view of search widget
 * 
 * @param dataAccessLayer implementation of ISearchDAL passed with props
 * 
 * @returns JSX.Element
 */
export const SearchBar = ({ dataAccessLayer }: ISearchBarProps): JSX.Element => {
    const filter = new SearchFilter();
    const DAL = dataAccessLayer;
    const { model } = useReduxSelector(state => state.Search)
    const [text, setText] = useState<string>('');
    const [searchInDocument, setSearchInDocument] = useState<boolean>(true);
    const [searchInFile, setSearchInFile] = useState<boolean>(true);
    const [searchInConversation, setSearchInConversation] = useState<boolean>(true);


    /**
     * @editFilter 
     * Function whos set data to SearchFilter properties
     * 
     * @param text string value for filter searchString property
     */
    function editFilter(text: string): void {
        filter.SearchString = text;
        filter.ShowRecord = searchInDocument;
        filter.ShowAttachment = searchInFile;
        filter.ShowAttachmentName = searchInConversation;
    };

    /**
     * @renderSearchResults 
     * Function for render search result, if its model != undefined
     * 
     * @returns JSX.Element | JSX.Element[][][]
     * 
     */
    function renderSearchResults(): JSX.Element | JSX.Element[][][] {
        if (model === undefined) {
            return <Text>No search results</Text>
        } else {
            return new SearchResult(model.templates, dataAccessLayer).render()
        };
    };

    /**
     * @applySearchFilter 
     * Function for apply filter changes and invoke search method
     * 
     * @param text string value for filter searchString property
     */
    async function applySearchFilter(text: string): Promise<void> {
        setText(text)
        editFilter(text);
        await DAL.search(filter);
    };

    return (
        <View style={{ marginTop: 100 }}>
            <Input
                value={text}
                onChangeText={async (text) => await applySearchFilter(text)}
            />
            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }} >
                <Checkbox
                    style={{ marginBottom: 5 }}
                    value="test"
                    accessibilityLabel="This is a dummy checkbox"
                    defaultIsChecked={searchInDocument}
                    onChange={() => setSearchInDocument(!searchInDocument)}
                >
                    Атрибуты
                </Checkbox>
                <Checkbox
                    style={{ marginBottom: 5 }}
                    value="test"
                    accessibilityLabel="This is a dummy checkbox"
                    defaultIsChecked={searchInFile}
                    onChange={() => setSearchInFile(!searchInFile)}
                >
                    Имя вложения
                </Checkbox>
                <Checkbox
                    style={{ marginBottom: 5 }}
                    value="test"
                    accessibilityLabel="This is a dummy checkbox"
                    defaultIsChecked={searchInConversation}
                    onChange={() => setSearchInConversation(!searchInConversation)}
                >
                    Содержимое вложения
                </Checkbox>
            </View>
            <Divider />
            <ScrollView>
                {renderSearchResults()}
            </ScrollView>
        </View>
    );
};