import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Utils } from "./Utils";
import Controls from "./Controls";
import PropTypes from "prop-types";
import GeneralPicker from "../../../app/components/Picker/Picker";
import moment from "moment-jalaali";
const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;
 const BUTTON_HEIGHT=DEVICE_HEIGHT*0.075;
 const PADDING=DEVICE_WIDTH*0.025;

const Triangle = ({
  bottomWidth,
  containerStyle,
  color,
  direction = "top"
}) => (
  <View
    style={[
      {
        width: 0,
        height: 0,
        borderLeftWidth: bottomWidth / 2,
        borderRightWidth: bottomWidth / 2,
        borderBottomWidth: direction === "top" ? bottomWidth : 0,
        borderTopWidth: direction === "top" ? 0 : bottomWidth,
        borderTopColor: color,
        borderStyle: "solid",
        backgroundColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: color,
        marginBottom: 3
      },
      containerStyle
    ]}
  />
);
export default function HeaderControls(props) {
  const {
    styles,
    initialDate,
    currentMonth,
    currentYear,
    onPressNext,
    onPressPrevious,
    months,
    previousTitle,
    nextTitle,
    textStyle,
    minDate,
    maxDate
  } = props;
  const MONTHS = months ? months : Utils.MONTHS; // English Month Array
  // getMonth() call below will return the month number, we will use it as the
  // index for month array in english
  const previous = previousTitle ? previousTitle : "قبلی";
  const next = nextTitle ? nextTitle : "بعدی";
  const month = MONTHS[currentMonth];
  const year = currentYear;
  renderMonths = () => {
    const monthName = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند"
    ];
    return monthName.map((item, index) => {
      return (
        <Text
          key={index}
          style={{ textAlign: "center", fontSize: 16 }}
          label={item}
          value={index}
        >
          {item}
        </Text>
      );
    });
  };
  renderYears = () => {
    const minYear=moment(props.minDate).jYear();
    const maxYear=moment(props.maxDate).jYear();
    // console.log(moment(props.minDate).jYear())
    // console.log(moment(props.maxDate).jYear())
    let textArrayComponent = [];
    let currentYear = moment(new Date()).jYear();
    for (i = maxYear; i >= minYear; i--) {
      textArrayComponent.push(
        <Text
          key={i}
          style={{ textAlign: "center", fontSize: 16 }}
          label={i}
          value={i}
        >
          {i}
        </Text>
      );
    }
    return textArrayComponent;
  };
  return (
    <View style={[styles.headerWrapper,{paddingTop:PADDING}]}>
      <View style={styles.monthSelector}>
        <Controls
          label={previous}
          onPressControl={onPressPrevious}
          styles={styles.prev}
          textStyles={textStyle}
        />
      </View>
      <View>
        {/*<GeneralPicker*/}
        {/*placeHolderTextStyle={[styles.monthLabel, textStyle]}*/}
        {/*placeHolderText={year}*/}
        {/*onValueChange={value => {*/}
        {/*props.handleSetYear(value);*/}
        {/*}}*/}
        {/*>*/}
        {/*{this.renderYears()}*/}
        {/*</GeneralPicker>*/}
        <View
          style={[
            styles.monthLabel,
            {
              backgroundColor: "#bba067",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 6,
              borderStyle: "solid",
              borderColor: "#bba067",
              marginBottom: 2,
              height:BUTTON_HEIGHT

            }
          ]}
        >
          <View style={{ marginLeft: 5, position: "absolute" }}>
            <Triangle
              bottomWidth={10}
              containerStyle={{ marginBottom: 3 }}
              color={"white"}
              direction={"top"}
            />

            <Triangle
              bottomWidth={10}
              containerStyle={{ marginBottom: 3 }}
              color={"white"}
              direction={"bottom"}
            />
          </View>
          <GeneralPicker
            placeHolderTextStyle={[
              styles.monthLabel,
              textStyle,
              { color: "#fff" }
            ]}
            isItemSearchable={true}
            // placeHolderTextStyle={[.monthLabel, textStyle]}
            placeHolderText={year}
            onValueChange={value => {
              props.handleSetYear(value);
            }}
          >
            {this.renderYears()}
          </GeneralPicker>
        </View>

        <View
          style={[
            styles.monthLabel,
            {
              backgroundColor: "#bba067",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 6,
              borderStyle: "solid",
              borderColor: "#bba067",
              height:BUTTON_HEIGHT
            }
          ]}
        >
          <View style={{ marginLeft: 5, position: "absolute" }}>
            <Triangle
              bottomWidth={10}
              containerStyle={{ marginBottom: 3 }}
              color={"white"}
              direction={"top"}
            />

            <Triangle
              bottomWidth={10}
              containerStyle={{ marginBottom: 3 }}
              color={"white"}
              direction={"bottom"}
            />
          </View>
          <GeneralPicker
            placeHolderTextStyle={[
              styles.monthLabel,
              textStyle,
              { color: "#fff" }
            ]}
            placeHolderText={month}
            onValueChange={value => {
              props.handleSetMonth(value);
            }}
          >
            {this.renderMonths()}
          </GeneralPicker>
        </View>
        {/*<Text style={[styles.monthLabel, textStyle]}>*/}
        {/*{ month } { year }*/}
        {/*</Text>*/}
      </View>
      <View style={styles.monthSelector}>
        <Controls
          label={next}
          onPressControl={onPressNext}
          styles={styles.next}
          textStyles={textStyle}
        />
      </View>
    </View>
  );
}

HeaderControls.propTypes = {
  initialDate: PropTypes.instanceOf(Date),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onPressNext: PropTypes.func,
  onPressPrevious: PropTypes.func
};
