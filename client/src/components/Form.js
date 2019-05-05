import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Popup, Modal } from 'semantic-ui-react'
import API from "../utils/API";

const avatars = [
  'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
  'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
  'https://react.semantic-ui.com/images/avatar/small/stevie.jpg',
  'https://react.semantic-ui.com/images/avatar/small/veronika.jpg',
  'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
  'https://react.semantic-ui.com/images/avatar/small/christian.jpg',
  'https://react.semantic-ui.com/images/avatar/small/ade.jpg',
  'https://react.semantic-ui.com/images/avatar/small/zoe.jpg',
  'https://react.semantic-ui.com/images/avatar/small/nan.jpg',
  'https://react.semantic-ui.com/images/avatar/small/rachel.png',
  'https://react.semantic-ui.com/images/avatar/small/lindsay.png',
  'https://react.semantic-ui.com/images/avatar/small/matthew.png',
  'https://react.semantic-ui.com/images/avatar/small/tom.jpg',
  'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
  'https://react.semantic-ui.com/images/avatar/small/helen.jpg',
  'https://react.semantic-ui.com/images/avatar/small/daniel.jpg',
  'https://react.semantic-ui.com/images/avatar/small/lena.png',
  'https://react.semantic-ui.com/images/avatar/small/mark.png',
  'https://react.semantic-ui.com/images/avatar/small/molly.png',
  'https://react.semantic-ui.com/images/avatar/small/justen.jpg',
  'https://react.semantic-ui.com/images/avatar/small/laura.jpg',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription02&hairColor=Platinum&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=DefaultNatural&mouthType=Sad&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Circle&topType=Turban&accessoriesType=Prescription01&hatColor=Blue03&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtScoopNeck&clotheColor=Gray02&eyeType=Hearts&eyebrowType=FlatNatural&mouthType=Smile&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight2&accessoriesType=Round&hatColor=Blue03&hairColor=Platinum&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=PastelYellow&eyeType=Surprised&eyebrowType=SadConcerned&mouthType=Concerned&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairDreads&accessoriesType=Sunglasses&hairColor=Blonde&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Side&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription02&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Close&eyebrowType=SadConcernedNatural&mouthType=Default&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Prescription02&hatColor=Red&hairColor=BlondeGolden&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=ShirtVNeck&clotheColor=Red&eyeType=Hearts&eyebrowType=UpDownNatural&mouthType=Concerned&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hatColor=White&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Auburn&clotheType=BlazerShirt&clotheColor=Blue02&eyeType=Default&eyebrowType=UnibrowNatural&mouthType=Serious&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurvy&accessoriesType=Blank&hairColor=PastelPink&facialHairType=BeardMagestic&facialHairColor=Platinum&clotheType=BlazerSweater&eyeType=Close&eyebrowType=RaisedExcitedNatural&mouthType=Twinkle&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat2&accessoriesType=Sunglasses&hatColor=PastelOrange&hairColor=BlondeGolden&facialHairType=MoustacheFancy&facialHairColor=Brown&clotheType=ShirtVNeck&clotheColor=PastelBlue&eyeType=Wink&eyebrowType=UpDown&mouthType=Default&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBigHair&accessoriesType=Prescription02&hatColor=PastelOrange&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Close&eyebrowType=UpDown&mouthType=Default&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&facialHairColor=Platinum&clotheType=ShirtScoopNeck&clotheColor=Gray01&eyeType=Close&eyebrowType=SadConcerned&mouthType=Smile&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Prescription02&hairColor=PastelPink&facialHairType=BeardLight&facialHairColor=BlondeGolden&clotheType=Overall&clotheColor=Blue01&eyeType=Dizzy&eyebrowType=Default&mouthType=Disbelief&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Kurt&hairColor=PastelPink&facialHairType=BeardMagestic&facialHairColor=Black&clotheType=BlazerSweater&clotheColor=Blue01&eyeType=Dizzy&eyebrowType=Default&mouthType=Vomit&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Wayfarers&hairColor=PastelPink&facialHairType=Blank&facialHairColor=Red&clotheType=BlazerShirt&eyeType=EyeRoll&eyebrowType=Default&mouthType=Twinkle&skinColor=Pale',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairShavedSides&accessoriesType=Kurt&hairColor=Platinum&facialHairType=MoustacheFancy&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=White&graphicType=Skull&eyeType=Side&eyebrowType=UpDownNatural&mouthType=Eating&skinColor=DarkBrown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hairColor=Red&facialHairType=MoustacheMagnum&facialHairColor=Red&clotheType=CollarSweater&clotheColor=Red&graphicType=Deer&eyeType=Hearts&eyebrowType=AngryNatural&mouthType=Grimace&skinColor=Black',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=Red&clotheType=CollarSweater&clotheColor=PastelGreen&eyeType=Dizzy&eyebrowType=RaisedExcitedNatural&mouthType=Eating&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Squint&eyebrowType=FlatNatural&mouthType=Vomit&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat3&accessoriesType=Blank&hatColor=Blue02&facialHairType=MoustacheMagnum&facialHairColor=Auburn&clotheType=GraphicShirt&clotheColor=PastelGreen&graphicType=Hola&eyeType=WinkWacky&eyebrowType=RaisedExcitedNatural&mouthType=Default&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairBun&accessoriesType=Sunglasses&hatColor=PastelBlue&hairColor=BlondeGolden&facialHairType=MoustacheMagnum&facialHairColor=Brown&clotheType=Hoodie&clotheColor=Red&graphicType=Deer&eyeType=Cry&eyebrowType=RaisedExcited&mouthType=Tongue&skinColor=Yellow',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairSides&accessoriesType=Wayfarers&hairColor=BlondeGolden&facialHairType=BeardLight&facialHairColor=Brown&clotheType=BlazerShirt&clotheColor=Gray01&eyeType=Dizzy&eyebrowType=Default&mouthType=Tongue&skinColor=Tanned',
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Kurt&hairColor=SilverGray&facialHairType=BeardLight&facialHairColor=Blonde&clotheType=GraphicShirt&clotheColor=Pink&graphicType=Diamond&eyeType=WinkWacky&eyebrowType=UnibrowNatural&mouthType=Twinkle&skinColor=Brown',
  'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=BeardLight&facialHairColor=Red&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=SkullOutline&eyeType=Surprised&eyebrowType=Angry&mouthType=Concerned&skinColor=Light',
  'https://avataaars.io/?avatarStyle=Circle&topType=WinterHat1&accessoriesType=Round&hatColor=White&facialHairType=Blank&facialHairColor=Red&clotheType=Overall&clotheColor=Gray02&eyeType=Cry&eyebrowType=UnibrowNatural&mouthType=Concerned&skinColor=Brown'
]

class FormComponent extends Component {

  state = {
    name: "",
    image: "",
    email: "",
    tag: "",
    link: "",
    summary: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.tag && this.state.summary) {
      API.saveHack({
        name: this.state.name,
        meta: Math.floor((Math.random() * 100) + 1),
        image: avatars[Math.floor(Math.random()*avatars.length)],
        email: this.state.email,
        tag: this.state.tag.toUpperCase(),
        link: this.state.link,
        flagged: false,
        summary: this.state.summary
      })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      
      window.location.reload()
    }

    //clear form
    this.setState({
      name: "",
      image: "",
      email: "",
      tag: "",
      link: "",
      summary: "",
      modalOpen: false
    })
  };

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Modal trigger={<Button onClick={this.handleOpen}>Post a hack</Button>}
      size = 'tiny'
      dimmer='inverted'
      open={this.modalOpen}
      onClose={this.handleClose}>
      <Modal.Header>Lit A F-orm</Modal.Header>
      <Modal.Content>
      <Form>
        <Form.Group widths='equal'>
        <Popup
          trigger={<Form.Field
            name='name'
            control={Input}
            label='Name or Alias (required)'
            value = {this.state.name}
            onChange={this.handleInputChange}
          />}
          content="Use your real name or an alias and make it fun!"
          basic
        />
        <Popup
          trigger={<Form.Field
          name='email'
          control={Input}
          label='Email (required)'
          value = {this.state.email}
          onChange={this.handleInputChange}
        />}
        content="This will be used if you want to edit/delete your own post."
        basic
        />
        </Form.Group>
        <Popup
          trigger={<Form.Field
          name='tag'
          control={Input}
          label='Tag (required)'
          value = {this.state.tag}
          onChange={this.handleInputChange}
        />}
        content="A specific word(s) that best relates to the hack to make it searchable e.g. General (if not specific), Migraine, etc."
        basic
        />
        <Form.Field
          name='summary'
          control={TextArea}
          label='Summary (required)'
          placeholder='Be brief and concise with your hack description.'
          value = {this.state.summary}
          onChange={this.handleInputChange}
        />
        <Popup
          trigger={<Form.Field
          name='link'
          control={Input}
          label='Reference'
          value = {this.state.link}
          onChange={this.handleInputChange}
        />}
        content="Not required. Provide an external source link if available such us videos, website articles, etc."
        basic
        />

        <Form.Field
          name='submit'
          control={Button}
          content='Hack Away'
          label='Verify all your information before submitting!'
          disabled = {!(this.state.name && this.state.email && this.state.tag && this.state.summary)}
          onClick = {this.handleFormSubmit}
        />
      </Form>
      </Modal.Content>

      </Modal>
    );
  }
}

export default FormComponent