// Copyright (c) 2015 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

package oauthdataporten

import (
	"encoding/json"
	"github.com/mattermost/platform/einterfaces"
	"github.com/mattermost/platform/model"
	"io"
	"fmt"
	"strings"
)

type DataportenProvider struct {
}

type DataportenUser struct {
	User     struct {
		Email        string   `json:"email"`
		Name         string   `json:"name"`
		Profilephoto string   `json:"profilephoto"`
		Userid     	 string   `json:"userid"`
		UseridSec    []string `json:"userid_sec"`
	} `json:"user"`
	//Id       string `json:"user.userid"`
	//Username string `json:"user.userid"`
	//Login    string `json:"user.userid"`
	//Email    string `json:"user.email"`
	//Name     string `json:"user.name"`
}

func init() {
	provider := &DataportenProvider{}
	einterfaces.RegisterOauthProvider(model.USER_AUTH_SERVICE_DATAPORTEN, provider)
}

func userFromDataportenUser(glu *DataportenUser) *model.User {
	user := &model.User{}
	username := glu.User.Userid
	user.Username = model.CleanUsername(username)
	splitName := strings.Split(glu.User.Name, " ")
	if len(splitName) == 2 {
		user.FirstName = splitName[0]
		user.LastName = splitName[1]
	} else if len(splitName) >= 2 {
		user.FirstName = splitName[0]
		user.LastName = strings.Join(splitName[1:], " ")
	} else {
		user.FirstName = glu.User.Name
	}
	strings.TrimSpace(user.Email)
	user.Email = glu.User.Email
	userId := glu.User.Userid
	user.AuthData = &userId
	user.AuthService = model.USER_AUTH_SERVICE_DATAPORTEN

	return user
}

func dataportenUserFromJson(data io.Reader) *DataportenUser {
	decoder := json.NewDecoder(data)
	var glu DataportenUser
	err := decoder.Decode(&glu)
	if err == nil {
		return &glu
	} else {
		return nil
	}
}

func (glu *DataportenUser) IsValid() bool {
	fmt.Printf("%+v\n", glu.User)
	if len(glu.User.Userid) == 0 {
		return false
	}

	if len(glu.User.Email) == 0 {
		return false
	}

	return true
}

func (glu *DataportenUser) getAuthData() string {
	return glu.User.Userid
}

func (m *DataportenProvider) GetIdentifier() string {
	return model.USER_AUTH_SERVICE_DATAPORTEN
}

func (m *DataportenProvider) GetUserFromJson(data io.Reader) *model.User {
	glu := dataportenUserFromJson(data)
	if glu.IsValid() {
		return userFromDataportenUser(glu)
	}
	//buf := new(bytes.Buffer)
	//buf.ReadFrom(data)
	//s := buf.String() // Does a complete copy of the bytes in the buffer.
	//fmt.Printf("%s\n", string(s))
	return &model.User{}
}

func (m *DataportenProvider) GetAuthDataFromJson(data io.Reader) string {
	glu := dataportenUserFromJson(data)
	if glu.IsValid() {

		return glu.getAuthData()
	}

	return ""
}
