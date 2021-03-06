import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import { withTranslation } from 'react-i18next';
import isEqual from 'lodash.isequal';
import DEFAULT_STATE from './Generator.d';
import { encrypt, decrypt, printCard } from '../../helper';
import { withStore } from '../../hoc';
import getUppy from './getUppy';
import {
    CardRenderer, FileInput, SelectInput, Field, LayerCard, GroupBox,
} from '../../components';
import {
    ELEMENTS,
    HP_CHOICES,
    WEAKNESS_CHOICES,
    DAMMAGE_CHOICES,
    ATTACK_AMOUNT_CHOICES,
    RARITY_CHOICES,
    KEY_CACHE_POKECARD,
    RETREAT_CHOICES,
    RESISTANCE_CHOICES,
} from '../../const';

const { REACT_APP_VERSION, REACT_APP_TITLE, REACT_APP_ENCRYPT_KEY } = process.env;

class Generator extends Component {
    constructor(props) {
        super(props);

        const cachedCard = localStorage.getItem(KEY_CACHE_POKECARD);
        this.state = cachedCard ? decrypt(cachedCard, REACT_APP_ENCRYPT_KEY) : DEFAULT_STATE;
        this.stageRef = React.createRef();
        this.mainPictureUppy = getUppy('uppy-main-picture', props.transloaditParams, props.i18n.language);
        this.evolvePictureUppy = getUppy('uppy-evolve-picture', props.transloaditParams, props.i18n.language);
    }

    handleChange = (event) => {
        const nested = event.target.getAttribute('nested');
        if (nested) {
            this.setState({
                [nested] : { ...this.state[nested], [event.target.name] : event.target.value },
            }, this.cacheCard);
        } else this.setState({ [event.target.name] : event.target.value }, this.cacheCard);
    };

    cacheCard = () => {
        localStorage.setItem(KEY_CACHE_POKECARD, encrypt(this.state, REACT_APP_ENCRYPT_KEY));
    }

    exportCard = () => {
        const link = document.createElement('a');
        link.download = 'card.png';
        link.href = this.stageRef.current.getStage().toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    resetCard = () => {
        if (
            !isEqual(this.state, DEFAULT_STATE)
            && window.confirm(this.props.t('confirmReset'))
        ) {
            this.setState(DEFAULT_STATE);
            this.flip = true;
            localStorage.removeItem(KEY_CACHE_POKECARD);
        }
    };

    updateImgPos = (event) => {
        const { attrs } = event.target;
        this.setState({ [`${attrs.name}X`] : attrs.x, [`${attrs.name}Y`] : attrs.y }, this.cacheCard);
    }

    setRetreatVisible = (visible) => {
        this.setState({ retreatVisible : visible }, this.cacheCard);
    }

    removePicture = (pictureName) => {
        this.setState({ [pictureName] : null }, this.cacheCard);
    }

    handleBox = (number, focusField = null) => {
        const { openedGroup } = this.state;

        // Divided in if/else in order to avoid focus on closing
        if (openedGroup === number) {
            this.setState({ openedGroup : '' });
        }
        else {
            if (focusField) {
                const input = document.querySelector(focusField);
                
                if (input) input.focus();
                else console.log(`${focusField} to focus doesn't exist`);
            }
            this.setState({ openedGroup : number });
        }
    }

    render() {
        const {
            name,
            type,
            mainPicture,
            hp,
            species,
            length,
            weight,
            stage,
            nameEvolution,
            evolvePicture,
            weaknessType, weaknessAmount, resistanceType, resistanceAmount, retreat, description, illustrator, cardNumber, totalCollection, rarity,
            attack1,
            attack2,
            openedGroup,
        } = this.state;

        const { t } = this.props;

        return (
            <div className="Generator columns">
                <div className="column is-one-quarter">
                    <GroupBox
                        open={openedGroup === '01'}
                        onClick={this.handleBox}
                        stepNumber="01"
                        title="Pokemon info"
                    >
                        <Field label={t('name')}>
                            <input
                                type="text"
                                name="name"
                                className="input"
                                onChange={this.handleChange}
                                value={name}
                            />
                        </Field>
                        <Field label={t('type')}>
                            <SelectInput
                                name="type"
                                onChange={this.handleChange}
                                value={type}
                                choices={ELEMENTS}
                                blankLine={false}
                            />
                        </Field>
                        <Field label={t('picture')}>
                            <FileInput
                                name="mainPicture"
                                onChange={this.handleChange}
                                value={mainPicture}
                                uppy={this.mainPictureUppy}
                            />
                        </Field>
                        <Field label="HP">
                            <SelectInput
                                name="hp"
                                onChange={this.handleChange}
                                value={hp}
                                choices={HP_CHOICES}
                                suffix=" HP"
                                blankLine={false}
                            />
                        </Field>
                        <Field label={t('species')}>
                            <input
                                type="text"
                                name="species"
                                className="input"
                                onChange={this.handleChange}
                                value={species}
                            />
                        </Field>
                        <Field label={t('length')}>
                            <input
                                type="text"
                                name="length"
                                className="input"
                                placeholder={'0\' 0"'}
                                onChange={this.handleChange}
                                value={length}
                            />
                        </Field>
                        <Field label={t('weight')}>
                            <input
                                type="text"
                                name="weight"
                                className="input"
                                placeholder="0 lbs"
                                onChange={this.handleChange}
                                value={weight}
                            />
                        </Field>
                    </GroupBox>
                    <GroupBox
                        open={openedGroup === '02'}
                        onClick={this.handleBox}
                        stepNumber="02"
                        title={t('evolution')}
                    >
                        <Field label={t('stage')}>
                            <div className="select">
                                <select
                                    name="stage"
                                    onChange={this.handleChange}
                                    value={stage}
                                >
                                    <option value="basic">Basic</option>
                                    <option value="stage1">Stage 1</option>
                                    <option value="stage2">Stage 2</option>
                                </select>
                            </div>
                        </Field>
                        <Field label={t('name')}>
                            <input
                                type="text"
                                name="nameEvolution"
                                className="input"
                                onChange={this.handleChange}
                                value={nameEvolution}
                            />
                        </Field>
                        <Field label={t('picture')}>
                            <FileInput
                                name="evolvePicture"
                                onChange={this.handleChange}
                                value={evolvePicture}
                                uppy={this.evolvePictureUppy}
                            />
                        </Field>
                    </GroupBox>
                    <GroupBox
                        open={openedGroup === '03'}
                        onClick={this.handleBox}
                        stepNumber="03"
                        title={t('weaknessResistanceRetreat')}
                    >
                        <Field label={t('weaknessType')}>
                            <SelectInput
                                name="weaknessType"
                                onChange={this.handleChange}
                                value={weaknessType}
                                choices={ELEMENTS}
                            />
                        </Field>
                        <Field label={t('weaknessAmount')}>
                            <SelectInput
                                blankLine={false}
                                name="weaknessAmount"
                                onChange={this.handleChange}
                                value={weaknessAmount}
                                choices={WEAKNESS_CHOICES}
                            />
                        </Field>
                        <Field label={t('resistanceType')}>
                            <SelectInput
                                name="resistanceType"
                                onChange={this.handleChange}
                                value={resistanceType}
                                choices={ELEMENTS}
                            />
                        </Field>
                        <Field label={t('resistanceAmount')}>
                            <SelectInput
                                blankLine={false}
                                name="resistanceAmount"
                                onChange={this.handleChange}
                                value={resistanceAmount}
                                choices={RESISTANCE_CHOICES}
                            />
                        </Field>
                        <Field label={t('retreat')}>
                            <SelectInput
                                blankLine={false}
                                name="retreat"
                                onChange={this.handleChange}
                                value={retreat}
                                choices={RETREAT_CHOICES}
                            />
                        </Field>
                    </GroupBox>
                    <GroupBox
                        open={openedGroup === '04'}
                        onClick={this.handleBox}
                        stepNumber="04"
                        title={t('attack1')}
                    >
                        <Field label={t('name')}>
                            <input
                                type="text"
                                name="attack1Name"
                                nested="attack1"
                                className="input"
                                onChange={this.handleChange}
                                value={attack1.attack1Name}
                            />
                        </Field>
                        <Field label={t('dammage')}>
                            <SelectInput
                                name="attack1Dammage"
                                onChange={this.handleChange}
                                value={attack1.attack1Dammage}
                                nested="attack1"
                                choices={DAMMAGE_CHOICES}
                            />
                        </Field>
                        <Field label={t('info')}>
                            <textarea
                                type="text"
                                name="attack1Info"
                                nested="attack1"
                                className="textarea"
                                onChange={this.handleChange}
                                value={attack1.attack1Info}
                            />
                        </Field>
                        <Field label="Type">
                            <div className="columns">
                                <div className="column is-two-fifths">
                                    <SelectInput
                                        name="attack1Amount"
                                        onChange={this.handleChange}
                                        value={attack1.attack1Amount}
                                        nested="attack1"
                                        choices={ATTACK_AMOUNT_CHOICES}
                                        blankLine={false}
                                    />
                                </div>
                                <div className="column is-three-fifths">
                                    <SelectInput
                                        name="attack1Type"
                                        onChange={this.handleChange}
                                        value={attack1.attack1Type}
                                        choices={ELEMENTS}
                                        nested="attack1"
                                    />
                                </div>
                            </div>
                        </Field>
                    </GroupBox>
                </div>
                <div className="column is-half has-text-centered">
                    <div className="shape-wrapper">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="839"
                            height="783"
                            viewBox="0 0 839 783"
                            id="shape-1"
                            className="shape"
                        >
                            <path d="M417,9C581.813,25.749,841,231.508,839,361S745,609.688,669,678,467,857.556,237,708,3,523.361,1,403-11,235.147,125,107,299-2.992,417,9Z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="632"
                            height="669"
                            viewBox="0 0 632 669"
                            id="shape-2"
                            className="shape"
                        >
                            <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z" />
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="839"
                            height="783"
                            viewBox="0 0 839 783"
                            id="shape-3"
                            className="shape"
                        >
                            <path d="M386,2c96.9,36.313,196,224.529,212,265s54,103.656,20,162S508,564.756,468,597s-86,93.757-168,64S106,584.7,76,569,0,494.583,0,439,22,270.44,30,226s10-89.626,32-114S188,52.32,254,32,370-4,386,2Z" />
                        </svg>
                        <div id="circle-1" className="circle" />
                        <div id="circle-2" className="circle" />
                        <div id="circle-3" className="circle" />
                        <div id="circle-4" className="circle" />
                        <div id="circle-5" className="circle" />
                    </div>
                    <div className="card-container">
                        <Stage
                            width={540}
                            height={755}
                            ref={this.stageRef}
                        >
                            <CardRenderer
                                {...this.state}
                                updateImgPos={this.updateImgPos}
                            />
                        </Stage>
                        <LayerCard
                            {...this.state}
                            handleChange={this.handleChange}
                            setRetreatVisible={this.setRetreatVisible}
                            removePicture={this.removePicture}
                            mainPictureUppy={this.mainPictureUppy}
                            evolvePictureUppy={this.evolvePictureUppy}
                            handleBox={this.handleBox}
                        />
                    </div>
                </div>
                <div className="column is-one-quarter">
                    <GroupBox
                        open={openedGroup === '05'}
                        onClick={this.handleBox}
                        stepNumber="05"
                        title={t('attack2')}
                    >
                        <Field label={t('name')}>
                            <input
                                type="text"
                                name="attack2Name"
                                className="input"
                                onChange={this.handleChange}
                                nested="attack2"
                                value={attack2.attack2Name}
                            />
                        </Field>
                        <Field label={t('dammage')}>
                            <SelectInput
                                name="attack2Dammage"
                                onChange={this.handleChange}
                                value={attack2.attack2Dammage}
                                nested="attack2"
                                choices={DAMMAGE_CHOICES}
                            />
                        </Field>
                        <Field label={t('info')}>
                            <textarea
                                type="text"
                                name="attack2Info"
                                className="textarea"
                                onChange={this.handleChange}
                                nested="attack2"
                                value={attack2.attack2Info}
                            />
                        </Field>
                        <Field label="Type">
                            <div className="columns">
                                <div className="column is-two-fifths">
                                    <SelectInput
                                        name="attack2Amount"
                                        onChange={this.handleChange}
                                        value={attack2.attack2Amount}
                                        nested="attack2"
                                        choices={ATTACK_AMOUNT_CHOICES}
                                        blankLine={false}
                                    />
                                </div>
                                <div className="column is-three-fifths">
                                    <SelectInput
                                        name="attack2Type"
                                        onChange={this.handleChange}
                                        value={attack2.attack2Type}
                                        choices={ELEMENTS}
                                        nested="attack2"
                                    />
                                </div>
                            </div>
                        </Field>
                    </GroupBox>
                    <GroupBox
                        open={openedGroup === '06'}
                        onClick={this.handleBox}
                        stepNumber="06"
                        title={t('additionalInformation')}
                    >
                        <Field label={t('description')}>
                            <textarea
                                name="description"
                                className="textarea"
                                onChange={this.handleChange}
                                value={description}
                            />
                        </Field>
                        <Field label={t('illustrator')}>
                            <input
                                type="text"
                                name="illustrator"
                                className="input"
                                onChange={this.handleChange}
                                value={illustrator}
                            />
                        </Field>
                        <Field label={t('collectionNumber')}>
                            <input
                                type="text"
                                name="cardNumber"
                                className="input small"
                                onChange={this.handleChange}
                                maxLength={3}
                                value={cardNumber}
                            />{' '}
                            /
                            <input
                                type="text"
                                name="totalCollection"
                                className="input small"
                                onChange={this.handleChange}
                                maxLength={3}
                                value={totalCollection}
                            />
                        </Field>
                        <Field label={t('rarity')}>
                            <SelectInput
                                name="rarity"
                                onChange={this.handleChange}
                                value={rarity}
                                choices={RARITY_CHOICES}
                                blankLine={false}
                            />
                        </Field>
                    </GroupBox>
                    <div className="panel-actions">
                        <button onClick={this.exportCard} className="gradient-btn" title={t('downloadCard')}>
                            <i className="fas fa-download" />
                        </button>
                        <button onClick={printCard} className="gradient-btn" title={t('printCard')}>
                            <i className="fas fa-print" />
                        </button>
                        <button className="gradient-btn" title={t('saveCard')}>
                            <i className="fas fa-hdd" />
                        </button>
                        <button onClick={this.resetCard} className="gradient-btn" title={t('resetCard')}>
                            <i className="fas fa-sync-alt" />
                        </button>
                        <button className="gradient-btn" title={t('shareCard')}>
                            <i className="fas fa-share-alt" />
                        </button>
                    </div>
                    <div className="signature">
                        <div className="version">
                            <b>Version {REACT_APP_VERSION}</b>
                            <div>
                                {REACT_APP_TITLE} © {new Date().getFullYear()}
                            </div>
                        </div>
                        <div className="signature-desc">
                            <span role="img" aria-label="megaphone">📢</span> {t('news')}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Generator.propTypes = {
    transloaditParams : PropTypes.shape({
        signature : PropTypes.string,
        params    : PropTypes.string,
    }).isRequired,
};

export default withTranslation('generator')(withStore(['transloaditParams'])(Generator));
