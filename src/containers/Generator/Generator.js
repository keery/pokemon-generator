import React, { Component } from 'react';
import { Stage } from 'react-konva';
import { withTranslation } from 'react-i18next';
import isEqual from 'lodash.isequal';
import {
    CardRenderer, FileInput, SelectInput, Field, GroupTitle,
} from '../../components';
import {
    ELEMENTS,
    HP_CHOICES,
    AMOUNT_CHOICES,
    DAMMAGE_CHOICES,
    ATTACK_AMOUNT_CHOICES,
    RARITY_CHOICES,
    RETREAT_CHOICES,
} from '../../const';

const DEFAULT_STATE = {
    type             : 'fire',
    stage            : 'basic',
    name             : '',
    nameEvolution    : '',
    mainPicture      : null,
    evolvePicture    : null,
    hp               : 30,
    weaknessType     : '',
    weaknessAmount   : '',
    resistanceType   : '',
    resistanceAmount : '',
    retreat          : '',
    description      : '',
    illustrator      : '',
    cardNumber       : '',
    totalCollection  : '',
    rarity           : '',
    species          : '',
    length           : '',
    weight           : '',
    attack1          : {
        attack1Name    : '',
        attack1Dammage : '',
        attack1Info    : '',
        attack1Type    : '',
        attack1Amount  : '1',
    },
    attack2 : {
        attack2Name    : '',
        attack2Dammage : '',
        attack2Info    : '',
        attack2Type    : '',
        attack2Amount  : '1',
    },
};

const { REACT_APP_VERSION, REACT_APP_TITLE } = process.env;

class Generator extends Component {
    constructor(props) {
        super(props);

        const cachedCard = localStorage.getItem('pokecard');
        this.state = cachedCard ? JSON.parse(cachedCard) : DEFAULT_STATE;
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
        localStorage.setItem('pokecard', JSON.stringify(this.state));
    }

    exportCard = () => {
        const link = document.createElement('a');
        link.download = 'card.png';
        link.href = this.stageRef.getStage().toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    resetCard = () => {
        if (
            !isEqual(this.state, DEFAULT_STATE)
            && window.confirm(this.props.t('generator:confirmReset'))
        ) {
            this.setState(DEFAULT_STATE);
            localStorage.removeItem('pokecard');
        }
    };

    fileHandler = (event) => {
        const { files } = event.target;

        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            const eventName = event.currentTarget.name;

            reader.onloadend = () => {
                const img = new Image();
                img.src = reader.result;

                img.onload = () => {
                    let imgResized = null;
                    if (eventName === 'mainPicture') imgResized = this.resizeImg(img, 275, 196);
                    else if (eventName === 'evolvePicture') imgResized = this.resizeImg(img, 44, 40);

                    this.setState({ [eventName] : imgResized });
                };
            };

            reader.readAsDataURL(file);
        }
    };

    printCard() {
        window.print();
    }

    calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        if (srcWidth > maxWidth || srcHeight > maxHeight) {
            let height = 0;
            let width = 0;

            if (srcWidth > srcHeight) {
                height = maxHeight + 4;
                width = (srcWidth / srcHeight) * height;
            } else {
                width = maxWidth + 4;
                height = (srcHeight / srcWidth) * width;
            }

            return { width, height };
        }

        return { width : srcWidth, height : srcHeight };
    }

    resizeImg(img, maxWidth, maxHeight) {
        const ratio = this.calculateAspectRatioFit(img.width, img.height, maxWidth, maxHeight);

        img.width = ratio.width;
        img.height = ratio.height;
        return img;
    }

    handleFieldBox(event) {
        const _this = event.currentTarget;
        const parent = _this.parentNode;

        if (!parent.classList.contains('open')) {
            const boxes = document.getElementsByClassName('gfields-box');

            if (boxes.length > 0) {
                for (let i = 0; i < boxes.length; i++) {
                    boxes[i].classList.remove('open');
                    boxes[i].querySelector('.gfields-content-wrapper').style.maxHeight = '0px';
                }
            }
        }

        const height = parent.classList.toggle('open')
            ? parent.querySelector('.gfields-content').clientHeight
            : 0;

        _this.nextSibling.style.maxHeight = `${height}px`;
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
        } = this.state;

        const { t } = this.props;

        return (
            <div className="Generator columns">
                <div className="column is-one-quarter">
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="01"
                            title="Pokemon info"
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:name')}>
                                    <input
                                        type="text"
                                        name="name"
                                        className="input"
                                        onChange={this.handleChange}
                                        value={name}
                                    />
                                </Field>
                                <Field label={t('generator:type')}>
                                    <SelectInput
                                        name="type"
                                        onChange={this.handleChange}
                                        value={type}
                                        choices={ELEMENTS}
                                        blankLine={false}
                                    />
                                </Field>
                                <Field label={t('generator:picture')}>
                                    <FileInput
                                        name="mainPicture"
                                        onChange={this.fileHandler}
                                        value={mainPicture}
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
                                <Field label={t('generator:species')}>
                                    <input
                                        type="text"
                                        name="species"
                                        className="input"
                                        onChange={this.handleChange}
                                        value={species}
                                    />
                                </Field>
                                <Field label={t('generator:length')}>
                                    <input
                                        type="text"
                                        name="length"
                                        className="input"
                                        placeholder={'0\' 0"'}
                                        onChange={this.handleChange}
                                        value={length}
                                    />
                                </Field>
                                <Field label={t('generator:weight')}>
                                    <input
                                        type="text"
                                        name="weight"
                                        className="input"
                                        placeholder="0 lbs"
                                        onChange={this.handleChange}
                                        value={weight}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="02"
                            title={t('generator:evolution')}
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:stage')}>
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
                                <Field label={t('generator:name')}>
                                    <input
                                        type="text"
                                        name="nameEvolution"
                                        className="input"
                                        onChange={this.handleChange}
                                        value={nameEvolution}
                                    />
                                </Field>
                                <Field label={t('generator:picture')}>
                                    <FileInput
                                        name="evolvePicture"
                                        onChange={this.fileHandler}
                                        value={evolvePicture}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="03"
                            title={t('generator:weaknessResistanceRetreat')}
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:weaknessType')}>
                                    <SelectInput
                                        name="weaknessType"
                                        onChange={this.handleChange}
                                        value={weaknessType}
                                        choices={ELEMENTS}
                                    />
                                </Field>
                                <Field label={t('generator:weaknessAmount')}>
                                    <SelectInput
                                        name="weaknessAmount"
                                        onChange={this.handleChange}
                                        value={weaknessAmount}
                                        choices={AMOUNT_CHOICES}
                                    />
                                </Field>
                                <Field label={t('generator:resistanceType')}>
                                    <SelectInput
                                        name="resistanceType"
                                        onChange={this.handleChange}
                                        value={resistanceType}
                                        choices={ELEMENTS}
                                    />
                                </Field>
                                <Field label={t('generator:resistanceAmount')}>
                                    <SelectInput
                                        name="resistanceAmount"
                                        onChange={this.handleChange}
                                        value={resistanceAmount}
                                        choices={AMOUNT_CHOICES}
                                    />
                                </Field>
                                <Field label={t('generator:retreat')}>
                                    <SelectInput
                                        blankLine={false}
                                        name="retreat"
                                        onChange={this.handleChange}
                                        value={retreat}
                                        choices={RETREAT_CHOICES}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="04"
                            title={t('generator:attack1')}
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:name')}>
                                    <input
                                        type="text"
                                        name="attack1Name"
                                        nested="attack1"
                                        className="input"
                                        onChange={this.handleChange}
                                        value={attack1.attack1Name}
                                    />
                                </Field>
                                <Field label={t('generator:dammage')}>
                                    <SelectInput
                                        name="attack1Dammage"
                                        onChange={this.handleChange}
                                        value={attack1.attack1Dammage}
                                        nested="attack1"
                                        choices={DAMMAGE_CHOICES}
                                    />
                                </Field>
                                <Field label={t('generator:info')}>
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
                            </div>
                        </div>
                    </div>
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
                        <div id="shadow-card" />
                    </div>
                    <Stage
                        width={360}
                        height={506}
                        ref={(ref) => {
                            this.stageRef = ref;
                        }}
                    >
                        <CardRenderer {...this.state} />
                    </Stage>
                </div>
                <div className="column is-one-quarter">
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="05"
                            title={t('generator:attack2')}
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:name')}>
                                    <input
                                        type="text"
                                        name="attack2Name"
                                        className="input"
                                        onChange={this.handleChange}
                                        nested="attack2"
                                        value={attack2.attack2Name}
                                    />
                                </Field>
                                <Field label={t('generator:dammage')}>
                                    <SelectInput
                                        name="attack2Dammage"
                                        onChange={this.handleChange}
                                        value={attack2.attack2Dammage}
                                        nested="attack2"
                                        choices={DAMMAGE_CHOICES}
                                    />
                                </Field>
                                <Field label={t('generator:info')}>
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
                            </div>
                        </div>
                    </div>
                    <div className="gfields-box">
                        <GroupTitle
                            onClick={this.handleFieldBox}
                            stepNumber="06"
                            title={t('generator:additionalInformation')}
                        />
                        <div className="gfields-content-wrapper">
                            <div className="gfields-content">
                                <Field label={t('generator:description')}>
                                    <textarea
                                        type="text"
                                        name="description"
                                        className="textarea"
                                        onChange={this.handleChange}
                                        value={description}
                                    />
                                </Field>
                                <Field label={t('generator:illustrator')}>
                                    <input
                                        type="text"
                                        name="illustrator"
                                        className="input"
                                        onChange={this.handleChange}
                                        value={illustrator}
                                    />
                                </Field>
                                <Field label={t('generator:collectionNumber')}>
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
                                <Field label={t('generator:rarity')}>
                                    <SelectInput
                                        name="rarity"
                                        onChange={this.handleChange}
                                        value={rarity}
                                        choices={RARITY_CHOICES}
                                        blankLine={false}
                                    />
                                </Field>
                            </div>
                        </div>
                    </div>
                    <div className="panel-actions">
                        <button onClick={this.exportCard} className="gradient-btn" title={t('generator:downloadCard')}>
                            <i className="fas fa-download" />
                        </button>
                        <button onClick={this.printCard} className="gradient-btn" title={t('generator:printCard')}>
                            <i className="fas fa-print" />
                        </button>
                        <button className="gradient-btn" title={t('generator:saveCard')}>
                            <i className="fas fa-hdd" />
                        </button>
                        <button onClick={this.resetCard} className="gradient-btn" title={t('generator:resetCard')}>
                            <i className="fas fa-sync-alt" />
                        </button>
                        <button className="gradient-btn" title={t('generator:shareCard')}>
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
                            Le Lorem Ipsum est simplement du faux texte employé dans la composition
                            et la mise en page
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Generator);
