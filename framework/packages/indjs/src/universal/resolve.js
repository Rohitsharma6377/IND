
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function resolveElement(type) {
    const platform = (typeof PLATFORM !== 'undefined') ? PLATFORM : 'web';

    if (platform === 'web') {
        const webMap = {
            view: 'div',
            text: 'span',
            image: 'img',
            imagebackground: 'div', // map image-background to div with style
            scrollview: 'div',
            flatlist: 'div',
            sectionlist: 'div',
            keyboardavoidingview: 'div',
            safeareaview: 'div',
            pressable: 'button',
            touchableopacity: 'button',
            touchablehighlight: 'button',
            switch: 'input', // type='checkbox'
            textarea: 'textarea',
            button: 'button',
            modal: 'div',
            activityindicator: 'div',
            refreshcontrol: 'div'
        };
        return webMap[type.toLowerCase().replace(/-/g, '')] || 'div';
    }

    if (platform === 'mobile') {
        // In React Native, components are CamelCase
        // We need to map generic names to RN names
        const mobileMap = {
            view: 'View',
            text: 'Text',
            image: 'Image',
            imagebackground: 'ImageBackground',
            scrollview: 'ScrollView',
            flatlist: 'FlatList',
            sectionlist: 'SectionList',
            keyboardavoidingview: 'KeyboardAvoidingView',
            safeareaview: 'SafeAreaView',
            pressable: 'Pressable',
            touchableopacity: 'TouchableOpacity',
            touchablehighlight: 'TouchableHighlight',
            switch: 'Switch',
            modal: 'Modal',
            activityindicator: 'ActivityIndicator',
            refreshcontrol: 'RefreshControl',
            button: 'Button',
        };
        const rnName = mobileMap[type.toLowerCase().replace(/-/g, '')] || capitalize(type);

        // Safety check for React Native environment
        // react-native-web might be aliased, or we might be in a real RN environment
        try {
            // Using global check or safe require
            if (typeof require !== 'undefined') {
                return require('react-native')[rnName];
            } else if (typeof window !== 'undefined' && window.React && window.React.Native) {
                return window.React.Native[rnName];
            }
        } catch (e) {
            console.warn(`React Native component ${rnName} not found`);
        }
        // Fallback to View or div depending on context, but View is safe enough for logical return if mocked
        return 'View';
    }

    return 'div';
}
